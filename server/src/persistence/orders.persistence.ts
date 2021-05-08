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

  static async createOrder(data: Order) {
    // const orderCreate = await firestore.collection()
    return;
  }
}
