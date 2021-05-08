import { Order } from '../models/order';
import OrdersPersistence from '../persistence/orders.persistence';
import { CustomError, NotfoundError } from '../utils/exceptions';

export default class OrderService {
  static async createOrder(createData: Order): Promise<Order> {
    return createData;
  }

  static async updateOrder(
    orderId: string,
    updateData: { title: string; bookingDate: string | number }
  ): Promise<void> {
    try {
      const orderSnapshot = await OrdersPersistence.getOrder(orderId);

      if (!orderSnapshot) {
        throw new NotfoundError(`Order id: ${orderId} not found`);
      }

      const { title, bookingDate } = updateData;

      await orderSnapshot?.ref.update({
        title,
        bookingDate: Number(bookingDate),
      });

      return;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new Error('Order update failed');
    }
  }
}
