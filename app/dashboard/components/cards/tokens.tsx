import { Token } from "@/lib/types";
import TokenListCard from "./token-list-card";
import { fetchTokensAndNFTs } from "@/actions/fetch-tokens";

const Tokens = async () => {
  const tokenData: Token[] = [
    { name: "Solana (SOL)", amount: "50.00" },
    { name: "USDC", amount: "100.00" },
    { name: "Serum (SRM)", amount: "150.00" },
    { name: "Another Token", amount: "200.00" },
    { name: "One More Token", amount: "250.00" },
  ];

  const { tokens } = await fetchTokensAndNFTs();
  console.log(tokens);

  return <TokenListCard tokens={tokens.length > 0 ? tokens : tokenData} />;
};

export default Tokens;
