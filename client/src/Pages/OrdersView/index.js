import React, { useState } from 'react';
import { Table } from 'antd';
import { useHistory } from 'react-router';

import Footer from 'Components/Footer';
import NavBar from 'Components/Navbar';
import styles from './index.module.css';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '20%',
  },
  {
    title: 'Booking Date',
    dataIndex: 'bookingDate',
    width: '15%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (address) =>
      `${address.city}, ${address.country}, ${address.street}, ${address.zip}`,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    render: (customer) => `${customer.name}`,
    width: '20%',
  },
];

const createData = () => {
  let result = [];
  for (let i = 0; i < 20; i++) {
    result.push({
      id: i + 1,
      address: {
        city: 'Berlin 235',
        country: 'Germany 235',
        street: 'Wriezener Str. 12 23',
        zip: '13055',
      },
      bookingDate: 1554284950023,
      customer: {
        email: 'emad.alam124@construyo.de',
        name: 'Emad Alam',
        phone: '015252098067',
      },
      title: 'err title',
    });
  }
  return result;
};

const OrdersView = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(createData());
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const handleTableChange = () => {};

  const handleRowClick = (rowRecord) => {
    history.push(`/orders/${rowRecord.id}`);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.mainContent}>
        <div className={styles.topContent}>
          <h2 className={styles.topContent_title}>Orders</h2>
        </div>

        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
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
