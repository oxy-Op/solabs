"use client";

import React from "react";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button"; // Assume you're using a Button component from your UI library
import Image from "next/image";
import { useRouter } from "next/navigation";

const PaymentStatusModal = () => {
  const { type, data, onClose } = useModal();
  const router = useRouter();

  if (!type || (type !== "success" && type !== "error")) return null;

  const handleOnClose = () => {
    router.replace("/dashboard");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-[#1b1b1b] p-6 rounded-lg shadow-lg w-96 text-center">
        {type === "success" ? (
          <>
            <div className="flex justify-center mb-4">
              {/* Filled Green Tick - You can replace this with an SVG if needed */}
              {/* <span className="text-green-500 text-5xl">✅</span> */}
              <Image
                src={"/checked.png"}
                width={100}
                height={100}
                alt="success"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">SUCCESSFUL</h2>
            {data.paymentStatus && (
              <p className="text-gray-300 mb-4">
                You have topped up{" "}
                {(data.paymentStatus?.amount_total || 0) / 100}{" "}
                {data.paymentStatus?.currency?.toUpperCase()}.
              </p>
            )}
            <Button
              onClick={handleOnClose}
              className="bg-[#F0B90B] hover:bg-[#F0B90B]/80 text-black font-bold px-4 py-2 rounded-lg"
            >
              OK
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              {/* Filled Red Cross - You can replace this with an SVG if needed */}
              <Image
                src={"/cancel.png"}
                width={100}
                height={100}
                alt="success"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">FAILED</h2>
            <p className="text-gray-300 mb-4">
              Your payment was not successful. Please try again.
            </p>
            <Button
              onClick={handleOnClose}
              className="bg-[#F0B90B] hover:bg-[#F0B90B]/80 text-black font-bold px-4 py-2 rounded-lg"
            >
              OK
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusModal;
