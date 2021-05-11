import Axios from './axiosInstance';

export const updateOrder = async (orderId, data) => {
  return Axios({
    method: 'PUT',
    url: `/orders/${orderId}`,
    data,
  });
};
