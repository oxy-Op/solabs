import { publicKey, isNone, unwrapOption } from "@metaplex-foundation/umi";
import {
  fetchAllDigitalAssetWithTokenByOwner,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import { auth } from "@/auth";
import { solanaConnection } from "@/lib/rpc-connection";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { NFT, Token } from "@/lib/types";
import { convertTokenAmount } from "@/lib/utils";

// Function to initialize Umi
async function getUmiInstance() {
  const umi = createUmi(solanaConnection.rpcEndpoint);
  return umi;
}

async function fetchMetadataFromUri(uri: string) {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }
    return await response.json();
  } catch (error) {
    // console.error(`Error fetching metadata from URI: ${uri}`, error);
    return null;
  }
}

export async function fetchTokensAndNFTs(): Promise<{
  nfts: NFT[];
  tokens: Token[];
}> {
  const session = await auth();

  if (!session || !session.user || !session.user.publicKey) {
    return { nfts: [], tokens: [] };
  }

  const owner = publicKey(session.user.publicKey);
  const umi = await getUmiInstance();

  const assets = await fetchAllDigitalAssetWithTokenByOwner(umi, owner);

  const nfts: NFT[] = [];
  const tokens: Token[] = [];

  for (const asset of assets) {
    const mintAddress = asset.mint.publicKey.toString();
    const metadata = asset.metadata;
    console.log("MINT ADDRESS: ", mintAddress);

    if (metadata.uri) {
      const metadataDetails = await fetchMetadataFromUri(metadata.uri);

      if (metadataDetails) {
        const tokenStandardOption = metadata.tokenStandard;

        if (isNone(tokenStandardOption)) {
          const uiAmount = asset.token
            ? convertTokenAmount(
                asset.token.amount.toString(),
                asset.mint.decimals
              )
            : "0";

          tokens.push({
            name: metadataDetails.name || metadata.name || mintAddress,
            amount: uiAmount,
          });
        } else {
          const tokenStandard = unwrapOption(tokenStandardOption);

          if (
            tokenStandard === TokenStandard.NonFungible ||
            tokenStandard === TokenStandard.NonFungibleEdition ||
            tokenStandard === TokenStandard.ProgrammableNonFungible ||
            tokenStandard === TokenStandard.ProgrammableNonFungibleEdition
          ) {
            nfts.push({
              id: nfts.length + 1,
              name: metadataDetails.name || metadata.name || mintAddress,
              imageUrl: metadataDetails.image || "https://placeholder.com/100",
            });
          } else {
            const uiAmount = asset.token
              ? convertTokenAmount(
                  asset.token.amount.toString(),
                  asset.mint.decimals
                )
              : "0";

            tokens.push({
              name: metadataDetails.name || metadata.name || mintAddress,
              amount: uiAmount,
            });
          }
        }
      } else {
        const uiAmount = asset.token
          ? convertTokenAmount(
              asset.token.amount.toString(),
              asset.mint.decimals
            )
          : "0";

        tokens.push({
          name: mintAddress,
          amount: uiAmount,
        });
      }
    } else {
      const uiAmount = asset.token
        ? convertTokenAmount(asset.token.amount.toString(), asset.mint.decimals)
        : "0";

      tokens.push({
        name: mintAddress,
        amount: uiAmount,
      });
    }
  }

  return { nfts, tokens };
}
