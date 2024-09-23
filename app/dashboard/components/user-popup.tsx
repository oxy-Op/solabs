"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useState } from "react";

const UserAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover className="relative">
      <PopoverButton className={"p-3 rounded bg-[#1f1f1f] focus:outline-none"}>
        {address.replace(/^(.{4}).*(.{4})$/, "$1....$2")}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col space-y-3 bg-[#313131] min-h-32 rounded p-4 mt-2"
      >
        <Button
          onClick={onCopy}
          variant={"outline"}
          className="flex space-x-2 items-center"
        >
          <div>
            {copied ? (
              <CheckCircledIcon className="size-5 text-green-500" />
            ) : (
              <CopyIcon className="size-5" />
            )}
          </div>
          <div>
            <p className="font-semibold uppercase">Copy Address</p>
          </div>
        </Button>
        <Button
          onClick={() => signOut()}
          className="w-full font-semibold uppercase pr-6 hover:bg-red-200"
          variant={"destructive"}
        >
          Logout
        </Button>
      </PopoverPanel>
    </Popover>
  );
};

export default UserAddress;
