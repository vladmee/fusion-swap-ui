"use client";

import React, { useState } from "react";
import { LoadingState, MultiStepLoader } from "./ui/multi-step-loader";
import { CheckCheckIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

export const swapSteps: LoadingState[] = [
  {
    title: "Connect wallet",
    description:
      "Connect your wallet to load balances, networks and addresses.",
    button: {
      text: "Connect wallet",
    },
  },
  {
    title: "Switch to Ethereum",
    description:
      "Make sure you’re on the source chain so you can approve and sign the swap.",
    button: {
      text: "Switch network",
    },
  },
  {
    title: "Approve USDC",
    description:
      "Grant the Fusion+ settlement contract permission to move up to 100 USDC from your wallet when a resolver fills the order. (Gas fee required - standard ERC-20 approval)",
    button: {
      text: "Approve USDC",
    },
  },
  {
    title: "Sign swap intent",
    description:
      "Review the EIP-712 message and sign off-chain. This is gas-free and does not move funds; it just tells resolvers the terms of your swap.",
    button: {
      text: "Sign intent",
    },
  },
  {
    title: "Post order & start auction",
    description:
      "Broadcast the signed order to the Fusion+ order-book. Resolvers now compete in a Dutch auction to fill it at the best rate.",
    button: {
      text: "Start auction",
    },
  },
  {
    title: "Monitor settlement",
    description:
      "Track escrow creation on Ethereum ➜ escrow on TON ➜ secret reveal. No action needed unless you want to cancel after the exclusivity window.",
    button: {
      text: "",
    },
  },
];

export function GuideInterface() {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleGuideClick = () => {
    setLoading(true);
    setClicked(true);
  };

  return (
    <div className="mt-40 flex h-full w-1/3 flex-col items-start justify-start gap-6">
      {!clicked && (
        <Button
          onClick={handleGuideClick}
          className="mx-auto flex h-10 cursor-pointer items-center justify-center rounded-lg bg-[#39C3EF] px-8 text-sm font-medium text-black transition duration-200 hover:bg-[#39C3EF]/90 md:text-base"
          style={{
            boxShadow:
              "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
          }}
        >
          Guide me
        </Button>
      )}
      <MultiStepLoader
        loadingStates={swapSteps}
        loading={loading}
        duration={2000}
        setLoading={setLoading}
      />

      {loading && (
        <button
          className="fixed top-4 right-4 z-[120] text-black dark:text-white"
          onClick={() => setLoading(false)}
        >
          <XIcon className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
