export const getSpenderByChain = (chainId?: string | null): string => {
  if (!chainId) return "";

  switch (chainId) {
    case "1": // Ethereum Mainnet
      return "0x1111111254fb6c44bac0bed2854e76f90643097d"; // 1inch Aggregation Router
    case "56": // Binance Smart Chain
      return "0x1111111254fb6c44bac0bed2854e76f90643097d"; // 1inch Aggregation Router
    case "137": // Polygon
      return "0x1111111254fb6c44bac0bed2854e76f90643097d"; // 1inch Aggregation Router
    default:
      return ""; // No spender for unsupported chains
  }
};
