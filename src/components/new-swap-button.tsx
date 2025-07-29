"use client";

import { useSwapsActions } from "@/store/swaps-actions";
import { Button } from "./ui/button";

export const NewSwapButton = () => {
  const { onCreateNewSwap } = useSwapsActions();

  return (
    <Button onClick={() => onCreateNewSwap.mutate()}>Create New Swap</Button>
  );
};
