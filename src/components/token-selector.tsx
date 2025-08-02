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
      tokens
        ?.filter((token) => !!token.logoURI)
        .map((token) => ({
          label: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                src={token.logoURI!}
                alt={token.name}
                width={24}
                height={24}
              />
              <span className="min-w-28">{token.name}</span>
            </div>
          ),
          value: String(token.address),
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
