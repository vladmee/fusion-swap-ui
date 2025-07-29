"use client";

import { useSwapsActions } from "@/store/swaps-actions";
import { Button } from "./ui/button";

export const NewSwapButton = () => {
  const { onCreateNewSwap } = useSwapsActions();

  return <Button onClick={onCreateNewSwap}>Create New Swap</Button>;
};
