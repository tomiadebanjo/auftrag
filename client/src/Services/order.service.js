import { firestore } from 'Config/firebase';
import Axios from './axiosInstance';

export const updateOrder = async (orderId, data) => {
  return Axios({
    method: 'PUT',
    url: `/orders/${orderId}`,
    data,
  });
};

export const getOrderDocument = async (orderId) => {
  return firestore.collection('orders').doc(orderId);
};
