import { SupportedChain } from "@/app/api/supported-chains/schema";
import { Token } from "@/app/api/tokens-by-chain/schema";
import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/wheel-picker";
import { useMemo } from "react";

type TokenSelectorProps = {
  tokens: Token[] | undefined;
  value: string;
  onChange: (tokenAddress: string) => void;
};

export const TokenSelector = ({
  tokens,
  value,
  onChange,
}: TokenSelectorProps) => {
  const options: WheelPickerOption[] = useMemo(
    () =>
      tokens?.map((token) => ({
        label: token.name,
        value: token.address,
      })) ?? [],
    [tokens],
  );

  if (!tokens || options.length === 0) return;

  return (
    <WheelPickerWrapper>
      <WheelPicker options={options} value={value} onValueChange={onChange} />
    </WheelPickerWrapper>
  );
};
