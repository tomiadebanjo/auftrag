import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { auth } from 'Config/firebase';
import { useUserState } from 'Context/user.context';

const { Text } = Typography;

const DropdownMenu = ({ onClick }) => (
  <Menu onClick={onClick} selectable={false}>
    <Menu.Item key={'signOut'} style={{ textAlign: 'center' }}>
      Sign out
    </Menu.Item>
  </Menu>
);

const NavBar = () => {
  const { user } = useUserState();

  const signOut = () => auth.signOut();

  return (
    <header className={styles.headerWrapper}>
      <Link to="/orders" className={styles.headerLogo}>
        Auftrag
      </Link>
      <Dropdown
        overlay={<DropdownMenu onClick={signOut} />}
        placement="bottomCenter"
      >
        <div className={styles.userWrapper}>
          <div className={styles.userAvatar}>
            <Avatar icon={<UserOutlined />} />
          </div>
          {user.name && <Text className={styles.userName}>{user.name}</Text>}
          <DownOutlined />
        </div>
      </Dropdown>
    </header>
  );
};

export default NavBar;
