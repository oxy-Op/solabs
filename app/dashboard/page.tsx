import React from "react";
import NFTCard from "./components/cards/nft-card";
import BalanceCard from "./components/cards/balance-card";
import TokenListCard from "./components/cards/token-list-card";
import CustomContentCard from "./components/cards/custom-content-card";
import { NFT, Token } from "@/lib/types"; // Import types
import { getBalance } from "@/actions/get-balance";
import { getPaymentStatus } from "@/actions/get-payment-status";
import ModalTriggerClient from "../(payment)/components/modal-trigger";
import Tokens from "./components/cards/tokens";
import Nfts from "./components/cards/nfts";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: { session_id?: string; success?: string; error?: string };
}) => {
  console.log(searchParams);

  const sessionId = searchParams.session_id;
  const success = searchParams.success;
  const error = searchParams.error;
  const balance = await getBalance();
  const paymentStatus = await getPaymentStatus(sessionId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* First Card: Your NFTs */}
      <div className="md:col-span-2 card p-6 rounded-lg shadow-lg h-[500px] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-white">Your NFTs</h3>
        <Nfts />
      </div>

      <div className="flex flex-col space-y-5">
        {/* Second Card: Your Balance */}
        <BalanceCard balance={balance} />

        {/* Fourth Card: Your Tokens */}
        <Tokens />
      </div>
      {
        <ModalTriggerClient
          success={success}
          error={error}
          paymentStatus={paymentStatus}
        />
      }
      <CustomContentCard />
    </div>
  );
};

export default Dashboard;
