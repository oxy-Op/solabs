"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signWithProvider } from "@/actions/sign-provider";
import { useState } from "react";

export const Social = () => {
  const [loading, setLoading] = useState(false);
  const onClick = async (provider: "google" | "github") => {
    setLoading(true);
    signWithProvider(provider).finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col space-y-4 items-center w-full ">
      <Button
        size={"lg"}
        className="w-full"
        disabled={loading}
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        {<FcGoogle className="size-5" />}
      </Button>
      <Button
        disabled={loading}
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        {<FaGithub className="size-5" />}
      </Button>
    </div>
  );
};
