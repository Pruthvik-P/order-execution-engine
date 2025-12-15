import { CreateOrderRequest } from "../types/order";

export class Validators {
  static validateOrderRequest(req: any): {valid: boolean; error?:string} {
    const {tokenIn, tokenOut, amount, slippage} = req;

    if(!tokenIn || !tokenOut) {
      return {valid: false, error: 'tokenIn and tokenOut are required'};
    }

    if(!amount || amount <=0) {
      return {valid: false, error: 'amount mustbe greater than 0'};
    }

    if(slippage && (slippage < 0 || slippage > 1)) {
      return {valid: false, error: 'slippage must be between 0 and 1'};
    }
    return {valid: true};
  }

  static validateTokenAddress(address: string): boolean {
    return /^[1-9A-HJ-NP-Z]{43,44}$/.test(address);
  }

  static validateAmount(amount: number): boolean {
    return amount > 0 && Number.isFinite(amount);
  }
}