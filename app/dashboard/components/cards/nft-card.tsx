import Image from "next/image";
import React from "react";
import { NFT } from "@/lib/types"; // Import NFT type
import { Button } from "@/components/ui/button";

type NFTCardProps = {
  nft: NFT;
};

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  return (
    <div key={nft.id} className="relative p-4 rounded-lg shadow-md ">
      <Image
        src={nft.imageUrl}
        alt={nft.name}
        width={100}
        height={100}
        className="object-cover rounded"
      />
      <div className="mt-2">
        <h4 className="text-sm font-semibold text-white">{nft.name}</h4>
        <Button
          disabled
          className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
        >
          Transfer (coming soon)
        </Button>
      </div>
    </div>
  );
};

export default NFTCard;
