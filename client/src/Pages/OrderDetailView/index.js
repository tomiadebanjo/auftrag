import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Typography, Card, Form, Input, Button, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Footer from 'Components/Footer';
import NavBar from 'Components/Navbar';
import styles from './index.module.css';

const { Title } = Typography;

const OrderDetailView = () => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [initialValues] = useState({
    city: 'Berlin 235',
    country: 'Germany 235',
    street: 'Wriezener Str. 12 23',
    zip: '13055',
    bookingDate: 1554284950023,
    email: 'emad.alam124@construyo.de',
    name: 'Emad Alam',
    phone: '015252098067',
    title: 'err title',
  });

  const onFinish = () => {};

  return (
    <div className={styles.container}>
      <NavBar />
      <main className={styles.mainContent}>
        <div className={styles.topContent}>
          <h2 className={styles.topContent_title}>Order Details</h2>
          <Link to="/orders" className={styles.topContent_link}>
            <ArrowLeftOutlined style={{ fontSize: '15px' }} />
            <span>back to orders</span>
          </Link>
        </div>
        <Card bordered={false}>
          <div className={styles.switchContainer}>
            <Switch
              checked={editMode}
              onChange={(value) => setEditMode(value)}
            />
            <span className={styles.switchContainer_text}>Edit Mode</span>
          </div>
          <Form
            layout="vertical"
            initialValues={{ ...initialValues }}
            onFinish={onFinish}
            className={styles.formContainer}
          >
            <Form.Item
              label="Order Title"
              className={styles.formItem}
              name="title"
            >
              <Input size="large" readOnly={!editMode} />
            </Form.Item>
            <Form.Item
              label="Booking Date"
              className={styles.formItem}
              name="bookingDate"
            >
              <Input size="large" readOnly={!editMode} />
            </Form.Item>
            <Form.Item label="Name" name="name" className={styles.formItem_sm}>
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              className={styles.formItem_sm}
            >
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item name="email" label="Email" className={styles.formItem}>
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item
              label="Street"
              name="street"
              className={styles.formItem_lg}
            >
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item label="City" name="city" className={styles.formItem_sm}>
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item
              label="Country"
              name="city"
              className={styles.formItem_sm}
            >
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item label="Zip code" name="zip" className={styles.formItem}>
              <Input size="large" readOnly disabled={editMode} />
            </Form.Item>
            <Form.Item className={styles.formItem_lg}>
              {editMode && (
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.formItem_button}
                >
                  Update
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailView;
