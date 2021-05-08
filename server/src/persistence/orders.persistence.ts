import { firestore } from '../config/firebase';
import { Order } from '../models/order';

export default class OrdersPersistence {
  static async getOrder(
    id: string
  ): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> | null> {
    const orderRef = await firestore.collection('orders').doc(id).get();

    if (orderRef.exists) {
      return orderRef;
    }

    return null;
  }

  static async createOrder(data: Order): Promise<any> {
    const orderRef = await firestore.collection('orders').add(data);
    const newOrder = await orderRef.get();

    return { uid: newOrder.id, ...newOrder.data() };
  }
}
