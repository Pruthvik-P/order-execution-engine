export interface Quote {
  dex: string;
  price: number;
  fee: number;
  minAmountOut: number;
}

export interface SwapResult {
  txHash: string;
  executedPrice: number;
  timestamp: Date;
  dex: string;
}

export interface RoutingDecision {
  bestDex: string;
  bestPrice: number;
  quotes: {
    raydium?: Quote;
    meteor?: Quote;
  };
}
