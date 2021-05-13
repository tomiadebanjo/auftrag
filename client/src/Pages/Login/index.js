import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, useLocation } from 'react-router-dom';

import styles from './index.module.css';
import Footer from 'Components/Footer';
import Spinner from 'Components/Spinner';
import sideImage from 'Assets/images/login-unsplash.jpg';
import sideImageWebp from 'Assets/images/login-unsplash.webp';
import { useUserState } from 'Context/user.context';
import { auth } from 'Config/firebase';
import { loadingStateConstants } from 'Utils/constants';

const { Title, Text } = Typography;

const Login = () => {
  const location = useLocation();
  const { isAuthenticated, userLoading } = useUserState();
  const [loadingState, setLoadingState] = useState(
    loadingStateConstants.INITIAL
  );
  const [alertMessage, setAlertMessage] = useState(null);

  const clearError = () => {
    setAlertMessage(null);
  };

  const handleError = (error) => {
    console.log(error);
    setLoadingState(loadingStateConstants.ERROR);
    let errorMessage = 'Login failed, please try again';
    switch (error.code) {
      case 'auth/user-disabled':
        errorMessage = 'Your account has been disabled';
        break;
      case 'auth/wrong-password':
      case 'auth/user-not-found':
      case 'auth/invalid-email':
        errorMessage = 'Invalid credentials';
        break;

      default:
        break;
    }
    setAlertMessage(errorMessage);
  };

  const handleLogin = async (values) => {
    try {
      setLoadingState(loadingStateConstants.REQUESTING);
      const { email, password } = values;
      await auth.signInWithEmailAndPassword(email, password);

      setAlertMessage('Login successful, redirecting.');
      setLoadingState(loadingStateConstants.SUCCESS);
    } catch (error) {
      handleError(error);
    }
  };

  if (isAuthenticated) {
    let { from } = location.state || { from: { pathname: '/orders' } };
    return <Redirect to={from} />;
  }

  return (
    <main className={styles.container}>
      {userLoading ? (
        <Spinner />
      ) : (
        <>
          <section className={styles.leftSection}>
            <div className={styles.innerContainer}>
              <Title>Auftrag</Title>
              <div className={styles.formContainer}>
                {alertMessage && (
                  <Alert
                    closable
                    showIcon
                    message={alertMessage}
                    type={
                      loadingState === loadingStateConstants.ERROR
                        ? 'error'
                        : 'success'
                    }
                    onClose={clearError}
                  />
                )}

                <Text className={styles.subtitle}>
                  Welcome back, please login to your account
                </Text>
                <Form
                  name="login-form"
                  onFinish={handleLogin}
                  onValuesChange={clearError}
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
                      loading={
                        loadingState === loadingStateConstants.REQUESTING
                      }
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <Footer />
            </div>
          </section>
          <section className={styles.rightSection}>
            <picture>
              <source
                srcSet={sideImageWebp}
                type="image/webp"
                alt="beach line"
              />
              <img alt="beach line" src={sideImage} />
            </picture>
          </section>
        </>
      )}
    </main>
  );
};

export default Login;
