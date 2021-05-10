import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './index.module.css';
import sideImage from '../../Assets/images/nick-perez-duvq92-VCZ4-unsplash.jpg';
import { useHistory } from 'react-router';

const { Title, Text } = Typography;

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    history.push('/orders');
  };

  return (
    <main className={styles.container}>
      <section className={styles.leftSection}>
        <div className={styles.innerContainer}>
          <Title>Auftrag</Title>
          <div className={styles.formContainer}>
            <Text className={styles.subtitle}>
              Welcome back, please login to your account
            </Text>
            <Form
              name="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.loginForm_button}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
      <section className={styles.rightSection}>
        <img alt="side" src={sideImage} />
      </section>
    </main>
  );
};

export default Login;
