import React from "react";
import { Token } from "@/lib/types";

type TokenListCardProps = {
  tokens: Token[];
};

const TokenListCard: React.FC<TokenListCardProps> = ({ tokens }) => {
  return (
    <div className="card p-6 rounded-lg shadow-lg text-white ">
      <h3 className="text-xl font-semibold mb-4 p-2">Your Tokens</h3>
      <div className="token-list space-y-2">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="flex justify-between bg-black bg-opacity-50 p-3 rounded"
          >
            <span>
              {token.name.length >= 32
                ? `${token.name.replace(/^(.{4}).*(.{4})$/, "$1....$2")}...`
                : token.name}
            </span>
            <span>{token.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenListCard;
