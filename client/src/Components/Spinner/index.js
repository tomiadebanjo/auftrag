import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const spinnerIcon = <LoadingOutlined style={{ fontSize: 85 }} spin />;

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spin indicator={spinnerIcon} />
    </div>
  );
};

export default Spinner;
