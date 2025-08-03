"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { useState, useEffect, ComponentType } from "react";
import { StepItem } from "@/components/step-item";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { useParams } from "next/navigation";
import { useSwapsStore } from "@/store/swaps";

export type LoadingState = {
  title: string;
  description: string;
  button?: ComponentType<any>;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="relative mx-auto flex max-w-xl flex-col justify-start">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

        return (
          <motion.div
            key={index}
            className={cn("mb-4 flex gap-2 text-left")}
            initial={{ opacity: 0, y: -(value * 250) }}
            animate={{ opacity: opacity, y: -(value * 250) }}
            transition={{ duration: 0.5 }}
          >
            <StepItem item={loadingState} index={index} value={value} />
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 1000,
  setLoading,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  setLoading: (loading: boolean) => void;
}) => {
  const [currentState, setCurrentState] = useState(0);
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const { id } = useParams();
  const { swaps } = useSwapsStore();
  const swap = swaps.find((s) => s.id === id);

  useEffect(() => {
    if (!loading) {
      let activeState = 0;

      if (activeAccount?.address) {
        activeState = 1;
      }
      console.log({
        one: String(wallet?.getChain()?.id),
        two: swap?.fromChainId,
      });
      if (String(wallet?.getChain()?.id) === swap?.fromChainId) {
        activeState = 2;
      }
      setCurrentState(activeState);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentState((prevState) => {
        if (prevState === loadingStates.length - 1) {
          return prevState;
        }
        return prevState + 1;
      });
    }, duration);

    if (currentState === loadingStates.length - 1) {
      const endTimeout = setTimeout(() => {
        setLoading(false);
      }, duration);
      return () => {
        clearTimeout(timeout);
        clearTimeout(endTimeout);
      };
    }

    return () => clearTimeout(timeout);
  }, [
    currentState,
    loading,
    loadingStates.length,
    duration,
    setLoading,
    activeAccount,
    wallet,
    swap,
    swap?.isCorrectChain,
  ]);
  return <LoaderCore value={currentState} loadingStates={loadingStates} />;
};
