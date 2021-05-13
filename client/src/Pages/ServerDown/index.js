import React from 'react';
import { ReactComponent as ServerDownSvg } from 'Assets/svg/server_down.svg';

import styles from './index.module.css';
import { Link } from 'react-router-dom';

const ServerDown = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContent}>
        <Link to="/orders" className={styles.topContent_title}>
          Auftrag
        </Link>
      </div>
      <ServerDownSvg />
      <h1>500 Internal Server Error</h1>
      <p>We are working on fixing the issue</p>
    </div>
  );
};

export default ServerDown;
