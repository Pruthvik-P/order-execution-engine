import {
  PrismaClient,
  OrderStatus,
  OrderType,
  Order,
} from "../generated/prisma/client";
import { CreateOrderRequest } from "../types/order";
import { Logger } from "../utils/logger";

const logger = new Logger("OrderService");

export class orderService {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  async createOrder(req: CreateOrderRequest): Promise<string> {
    try {
      const order = await this.prisma.order.create({
        data: {
          userId: "user-1",
          type: req.orderType || OrderType.MARKET,
          tokenIn: req.tokenIn,
          tokenOut: req.tokenOut,
          amount: req.amount,
          slippage: req.slippage || 0.01,
          limitPrice: req.limitPrice,
          status: OrderStatus.PENDING,
          retryCount: 0,
        },
      });
      logger.log(`Order created: ${order.id}`);
      return order.id;
    } catch (error) {
      logger.error(`Failed to create order`, error);
      throw error;
    }
  }

  
}
