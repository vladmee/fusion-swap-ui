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
      chains?.map((chain) => ({
        label: chain.chain_name,
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
