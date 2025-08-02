import { SupportedChain } from "@/app/api/supported-chains/schema";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/wheel-picker";
import { useMemo } from "react";

type ChainSelectorProps = {
  chains: SupportedChain[] | undefined;
  value: string;
  onChange: (chainId: string) => void;
};

export const ChainSelector = ({
  chains,
  value,
  onChange,
}: ChainSelectorProps) => {
  const options: WheelPickerOption[] = useMemo(
    () =>
      chains
        ?.filter((chain) => chain.chain_name !== "Sonic")
        .map((chain) => ({
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                src={chain.chain_icon}
                alt={chain.chain_name}
                width={24}
                height={24}
              />
              <span className="min-w-28">{chain.chain_name}</span>
            </div>
          ),
          value: String(chain.chain_id),
        })) ?? [],
    [chains],
  );

  if (!chains || options.length === 0) return;

  return (
    <WheelPickerWrapper>
      <WheelPicker options={options} value={value} onValueChange={onChange} />
    </WheelPickerWrapper>
  );
};
