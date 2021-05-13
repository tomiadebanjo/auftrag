import React, { createContext, useEffect, useState } from 'react';
import { firestore } from 'Config/firebase';
import { formatOrderData } from 'Utils/generalHelpers';
import { loadingStateConstants } from 'Utils/constants';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState({
    orders: [],
    loadingState: loadingStateConstants.INITIAL,
  });

  useEffect(() => {
    setOrders({
      ...orders,
      loadingState: loadingStateConstants.REQUESTING,
    });
    const subscription = firestore.collection('orders').onSnapshot(
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

    return () => {
      subscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
