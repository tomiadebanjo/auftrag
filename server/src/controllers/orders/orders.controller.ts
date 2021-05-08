import { Request, Response, NextFunction } from 'express';
import OrderService from '../../services/orders.service';
import HttpResponder from '../../utils/HttpResponder';

class OrdersController {
  static async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await OrderService.createOrder(req.body);
      return new HttpResponder(res).success(
        201,
        'Order creation successful',
        data
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      await OrderService.updateOrder(id, req.body);

      return new HttpResponder(res).success(200, 'Order update successful');
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;

      const order = await OrderService.getOrder(id);

      return new HttpResponder(res).success(200, 'Order retrieved', order);
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
