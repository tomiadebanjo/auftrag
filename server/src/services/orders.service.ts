import { Order } from '../models/order';
import OrdersPersistence from '../persistence/orders.persistence';
import { ClientError, NotfoundError, ServerError } from '../utils/exceptions';
import logger from '../utils/logger';

export default class OrderService {
  static async createOrder(createData: Order): Promise<any> {
    try {
      const { title, bookingDate, address, customer } = createData;

      const newOrder = await OrdersPersistence.createOrder({
        title,
        bookingDate,
        address,
        customer,
      });

      return newOrder;
    } catch (error) {
      logger.error(error.message);
      throw new ServerError('Order creation failed');
    }
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
      if (error instanceof ClientError) {
        throw error;
      }
      logger.error(error.message);
      throw new ServerError('Order update failed');
    }
  }

  static async getOrder(orderId: string): Promise<Order> {
    try {
      const orderSnapshot = await OrdersPersistence.getOrder(orderId);

      if (!orderSnapshot) {
        throw new NotfoundError(`Order id: ${orderId} not found`);
      }

      return { uid: orderSnapshot.id, ...orderSnapshot.data() };
    } catch (error) {
      if (error instanceof ClientError) {
        throw error;
      }
      logger.error(error.message);
      throw new ServerError(`Error fetching order with id: ${orderId}`);
    }
  }
}
