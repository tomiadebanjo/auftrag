import { Request, Response, NextFunction } from 'express';
import HttpResponder from '../../utils/HttpResponder';

class OrdersController {
  static async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      return new HttpResponder(res).success(200, 'Order update successful');
    } catch (error) {
      next(error);
    }
  }

  static async updateOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      return new HttpResponder(res).success(200, 'Order update successful');
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
