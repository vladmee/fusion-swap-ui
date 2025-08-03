"use client";

import { useSwapsActions } from "@/store/swaps-actions";
import { Button } from "./ui/button";

export const NewSwapButton = () => {
  const { onCreateNewSwap } = useSwapsActions();

  return (
    <button
      onClick={() => onCreateNewSwap.mutate()}
      className="relative cursor-pointer rounded-full border border-slate-600 bg-slate-700 px-8 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]"
    >
      <div className="absolute inset-x-0 -top-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-2xl" />
      <span className="relative z-20">Create New Swap</span>
    </button>
  );
};
