import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { DownOutlined, EyeInvisibleOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Flex, Layout, MenuProps, Space } from 'antd';

import { calculateBalance } from '@/utils/calculate-balance';

import { ROUTE_PATHS } from '../../constants/route-path';
import { useUserStore } from '../../store/userStore';

import styles from './styles.module.css';

const { Header } = Layout;

export const HeaderApp = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [balanceVisible, setBalanceVisible] = useState(
    sessionStorage.getItem('isBalanceVisible') === 'true'
  );
  const balance = calculateBalance(user?.transitions || []);

  const toggleBalanceVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    sessionStorage.setItem('isBalanceVisible', (!balanceVisible).toString());

    setBalanceVisible((prev) => !prev);
  };

  const handleExit = () => {
    navigate(ROUTE_PATHS.auth);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isBalanceVisible');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <span className={styles.balanceText}>
            {balanceVisible ? `${balance} y.e.` : '**** y.e.'}
          </span>
          <div onClick={(e) => toggleBalanceVisibility(e)} style={{ cursor: 'pointer' }}>
            {balanceVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </div>
        </Flex>
      ),
      key: '1',
    },
    {
      label: <NavLink to={ROUTE_PATHS.edit}>Редактировать</NavLink>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Button color="danger" variant="solid" onClick={handleExit} style={{ width: '100%' }}>
          Выйти
        </Button>
      ),
      key: '3',
    },
  ];

  return (
    <Header className={styles.headerWrapper}>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              size={40}
              icon={
                user?.avatar?.url ? <img src={user.avatar.url} alt="Avatar" /> : <UserOutlined />
              }
            />
            {user?.name || 'Name'}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
};
