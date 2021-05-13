import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Card, Form, Input, Button, Switch, message, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import Footer from 'Components/Footer';
import NavBar from 'Components/Navbar';
import styles from './index.module.css';
import { getOrderDocument, updateOrder } from 'Services/order.service';
import { formatOrderDetails } from 'Utils/generalHelpers';

const OrderDetailView = () => {
  const history = useHistory();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const handleInvalidOrder = useCallback(() => {
    message.error('Order does not exist', 3);
    history.push('/orders');
  }, [history]);

  const updateFormValues = useCallback(
    (values) => {
      form.setFieldsValue(values);
    },
    [form]
  );

  const handleUpdate = async (values) => {
    try {
      const { title, bookingDate } = values;
      await updateOrder(id, { title, bookingDate: bookingDate.valueOf() });
      updateEditMode(false);
      message.success('Order update successful', 3);
    } catch (error) {
      message.error('Order update failed', 3);
    }
  };

  const updateEditMode = (value) => {
    setEditMode(value);
  };

  useEffect(() => {
    let subscription;
    async function fetchOrder() {
      const order = await getOrderDocument(id);
      subscription = order.onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            const formattedData = formatOrderDetails(snapshot.data());
            updateFormValues(formattedData);
          } else {
            handleInvalidOrder();
          }
        },
        (error) => {
          message.error('Error fetching order', 3);
        }
      );
    }

    fetchOrder();
    return () => {
      subscription();
    };
  }, [handleInvalidOrder, id, updateFormValues]);

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
              onChange={(value) => updateEditMode(value)}
            />
            <span className={styles.switchContainer_text}>Edit Mode</span>
          </div>
          <Form
            layout="vertical"
            onFinish={handleUpdate}
            initialValues={{}}
            className={styles.formContainer}
            form={form}
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
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                allowClear={false}
                disabled={!editMode}
                className={styles.datePicker}
              />
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
