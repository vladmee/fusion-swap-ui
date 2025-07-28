import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <h1
      className={cn(
        "shimmer-text overflow-hidden text-xl font-bold whitespace-nowrap",
        className,
      )}
    >
      FusionSwapUI
    </h1>
  );
};
