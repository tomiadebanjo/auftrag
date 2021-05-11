import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';

const { Text } = Typography;

const DropdownMenu = ({ onClick }) => (
  <Menu onClick={onClick} selectable={false}>
    <Menu.Item key={'signOut'} style={{ textAlign: 'center' }}>
      Sign out
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  return (
    <header className={styles.headerWrapper}>
      <Link to="/orders" className={styles.headerLogo}>
        Auftrag
      </Link>
      <Dropdown
        overlay={
          <DropdownMenu
            onClick={() => console.log('Sign out button clicked')}
          />
        }
        placement="bottomCenter"
      >
        <div className={styles.userWrapper}>
          <div className={styles.userAvatar}>
            <Avatar icon={<UserOutlined />} />
          </div>
          <Text className={styles.userName}>Tomi Adebanjo</Text>
          <DownOutlined />
        </div>
      </Dropdown>
    </header>
  );
};

export default NavBar;
