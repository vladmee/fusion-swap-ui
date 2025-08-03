"use client";

import React, { useState } from "react";
import { LoadingState, MultiStepLoader } from "./ui/multi-step-loader";
import { CheckCheckIcon, XIcon } from "lucide-react";
import { ConnectButton } from "./connect-button";
import { Button } from "./ui/button";
import { useActiveAccount } from "thirdweb/react";
import { SwitchNetworkButton } from "./switch-network-button";

export const swapSteps: LoadingState[] = [
  {
    title: "Connect wallet",
    description:
      "Connect your wallet to load balances, networks and addresses.",
    button: (props) => <ConnectButton {...props} />,
  },
  {
    title: "Switch Network",
    description:
      "Make sure you’re on the source chain so you can approve and sign the swap.",
    button: (props) => <SwitchNetworkButton {...props} />,
  },
  {
    title: "Approve spending",
    description:
      "Grant the Fusion+ settlement contract permission to move the tokens from your wallet when a resolver fills the order. (Gas fee required - standard ERC-20 approval)",
    button: ({ isActive, item }) => (
      <Button className="w-full" disabled={!isActive}>
        Approve USDC
      </Button>
    ),
  },
  {
    title: "Sign swap intent",
    description:
      "Review the EIP-712 message and sign off-chain. This is gas-free and does not move funds; it just tells resolvers the terms of your swap.",
    button: ({ isActive, item }) => (
      <Button className="w-full" disabled={!isActive}>
        Sign intent
      </Button>
    ),
  },
  {
    title: "Post order & start auction",
    description:
      "Broadcast the signed order to the Fusion+ order-book. Resolvers now compete in a Dutch auction to fill it at the best rate.",
    button: ({ isActive, item }) => (
      <Button className="w-full" disabled={!isActive}>
        Start auction
      </Button>
    ),
  },
  {
    title: "Monitor settlement",
    description:
      "Track escrow creation on Ethereum ➜ escrow on TON ➜ secret reveal. No action needed unless you want to cancel after the exclusivity window.",
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
    <div className="flex h-full flex-col items-start justify-start gap-6">
      {!clicked && (
        <button
          onClick={handleGuideClick}
          className="group relative mx-auto inline-block cursor-pointer rounded-full bg-slate-800 p-px text-xs leading-6 font-semibold text-white no-underline shadow-2xl shadow-zinc-900"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
            <span>Preview</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
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
