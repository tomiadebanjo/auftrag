import React, { createContext, useEffect, useState } from 'react';
import { firestore } from 'Config/firebase';
import { formatOrderData } from 'Utils/generalHelpers';
import { loadingStateConstants } from 'Utils/constants';
import { useUserState } from './user.context';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState({
    orders: [],
    loadingState: loadingStateConstants.INITIAL,
  });
  const { isAuthenticated } = useUserState()

  useEffect(() => {
    let subscription = () => null;
    if (isAuthenticated) {
      setOrders({
        ...orders,
        loadingState: loadingStateConstants.REQUESTING,
      });
      subscription = firestore.collection('orders').onSnapshot(
        (snapshot) => {
          const ordersData = snapshot.docs.map(formatOrderData);

          setOrders({
            orders: ordersData,
            loadingState: loadingStateConstants.SUCCESS,
          });
        },
        (error) => {
          setOrders({
            ...orders,
            loadingState: loadingStateConstants.ERROR,
          });
        }
      );
    }

    return () => {
      subscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
