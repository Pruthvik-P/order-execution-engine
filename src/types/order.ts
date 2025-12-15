export enum OrderStatus{
  PENDING = 'pending',
  ROUTING = 'routing',
  BUILDING = 'building',
  SUBMITTED = 'submitted',
  CONFIRMED= 'confirmed',
  FAILED = 'failed',
}

export enum OrderType{
  MARKET = "market",
  LIMIT = "limit",
  SNIPER = "sniper",
}

export interface Order {
  id: string;
  userId: string;
  type: OrderType;
  tokenIn: string;
  tokenOut: string;
  amount: number;
  slippage: number;
  status: OrderStatus;
  dex: string;
  executedPrice?: number;
  txHash?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderRequest {
  tokenIn: string;
  tokenOut: string;
  amount: number;
  slippage?: number;
  limitPrice?: number;
  orderType?: OrderType;
}

export interface OrderExecutionResult {
  orderId: string;
  wsUrl: string;
}

export interface StatusUpdate {
  orderId: string;
  status: OrderStatus;
  timestamp: Date;
  dex?: string;
  price?: number;
  txHash?: string;
  error?: string;
}