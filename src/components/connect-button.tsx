"use client";

import { useConnectModal } from "thirdweb/react";
import { Button } from "./ui/button";
import { client } from "@/lib/thirdweb-client";

export const ConnectButton = ({ isActive }: { isActive: boolean }) => {
  const { connect, isConnecting } = useConnectModal();

  async function handleConnect() {
    const wallet = await connect({ client }); // opens the connect modal
    console.log("connected to", wallet);
  }

  return (
    <Button onClick={handleConnect} className="w-full" disabled={!isActive}>
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
