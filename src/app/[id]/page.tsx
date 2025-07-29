"use client";

import { useSwapsActions } from "@/store/swaps-actions";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = useParams();
  const { onSwapById } = useSwapsActions();

  const { data: swap, isError } = onSwapById(Array.isArray(id) ? id[0] : id);

  useEffect(() => {
    if (isError) {
      router.replace("/404");
    }
  }, [isError, router]);

  if (!swap) {
    return <div>Loading...</div>;
  }

  return <>{swap.id}</>;
}
