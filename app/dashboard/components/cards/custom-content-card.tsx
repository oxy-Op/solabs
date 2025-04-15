import React from "react";

const CustomContentCard: React.FC = () => {
  return (
    <div className="md:col-span-2 card p-6 rounded-lg shadow-lg h-auto ">
      <h3 className="text-xl font-semibold mb-4 text-white">Custom Content</h3>
      <div className="p-10 bg-gray-800 rounded">
        <p className="text-white">
          The dummy tokens and nfts will become real data when you have them in
          your account (devnet)
        </p>
      </div>{" "}
      {/* Empty for now */}
    </div>
  );
};

export default CustomContentCard;
