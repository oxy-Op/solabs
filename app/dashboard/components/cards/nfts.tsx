import { NFT } from "@/lib/types";
import NFTCard from "./nft-card";
import { fetchTokensAndNFTs } from "@/actions/fetch-tokens";

const Nfts = async () => {
  const nftDummyData: NFT[] = [
    {
      id: 1,
      name: "NFT 1",
      imageUrl: "https://via.placeholder.com/100?text=NFT+1",
    },
    {
      id: 2,
      name: "NFT 2",
      imageUrl: "https://via.placeholder.com/100?text=NFT+2",
    },
    {
      id: 3,
      name: "NFT 3",
      imageUrl: "https://via.placeholder.com/100?text=NFT+3",
    },
    {
      id: 4,
      name: "NFT 4",
      imageUrl: "https://via.placeholder.com/100?text=NFT+4",
    },
    {
      id: 5,
      name: "NFT 5",
      imageUrl: "https://via.placeholder.com/100?text=NFT+5",
    },
    {
      id: 6,
      name: "NFT 6",
      imageUrl: "https://via.placeholder.com/100?text=NFT+6",
    },
  ];

  const { nfts } = await fetchTokensAndNFTs();
  console.log(nfts);

  const nftData = nfts.length > 0 ? nfts : nftDummyData;
  return (
    <div className="nft-list grid grid-cols-3 gap-4">
      {nftData.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default Nfts;
