import React, { useContext } from 'react';
import { Table, Alert } from 'antd';
import { useHistory } from 'react-router';

import Footer from 'Components/Footer';
import NavBar from 'Components/Navbar';
import styles from './index.module.css';
import {
  formatAddress,
  formatBookingDate,
  formatCustomer,
  formatTitle,
} from 'Utils/generalHelpers';
import { loadingStateConstants } from 'Utils/constants';
import { OrderContext } from 'Context/order.context';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '20%',
    render: formatTitle,
  },
  {
    title: 'Booking Date',
    dataIndex: 'bookingDate',
    width: '15%',
    render: formatBookingDate,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: formatAddress,
    responsive: ['md'],
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    render: formatCustomer,
    width: '20%',
  },
];

const OrdersView = () => {
  const { orders, loadingState } = useContext(OrderContext);
  const history = useHistory();

  const handleRowClick = (rowRecord) => {
    history.push(`/orders/${rowRecord.id}`);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.mainContent}>
        {loadingState === loadingStateConstants.ERROR && (
          <Alert message="Error Fetching Orders" type="error" showIcon />
        )}
        <div className={styles.topContent}>
          <h2 className={styles.topContent_title}>Orders</h2>
        </div>

        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={orders}
            loading={loadingState === loadingStateConstants.REQUESTING}
            onRow={(record) => {
              return {
                onClick: () => handleRowClick(record),
              };
            }}
            rowClassName={() => styles.tableRow}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersView;
