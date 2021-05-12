import React from 'react';
import { ReactComponent as ServerDownSvg } from 'Assets/svg/server_down.svg';

import styles from './index.module.css';

const ServerDown = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContent}>
        <h2 className={styles.topContent_title}>Auftrag</h2>
      </div>
      <ServerDownSvg />
      <h1>500 Internal Server Error</h1>
      <p>We are working on fixing the issue</p>
    </div>
  );
};

export default ServerDown;
