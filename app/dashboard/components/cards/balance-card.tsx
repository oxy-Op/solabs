"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Import the Button from your UI library
import { useModal } from "@/hooks/use-modal";

type BalanceCardProps = {
  balance: number;
};

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const { onOpen } = useModal();
  return (
    <div className="card p-6 rounded-lg shadow-lg text-white h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">Your Balance</h3>
        <p className="text-2xl font-bold mt-2">{balance} SOL</p>{" "}
        {/* Added margin between the balance label and amount */}
      </div>

      <div className="flex space-x-4 mt-4">
        <Button
          onClick={() => onOpen("topup")}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-400"
        >
          Top Up
        </Button>
        <Button disabled variant="secondary" className="w-full md:w-auto">
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default BalanceCard;
