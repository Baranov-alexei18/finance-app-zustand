import { NavLink, useNavigate } from 'react-router';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, MenuProps, Space } from 'antd';

import { ROUTE_PATHS } from '../../constants/route-path';
import { useUserStore } from '../../store/userStore';

import styles from './styles.module.css';

const { Header } = Layout;

export const HeaderApp = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleExit = () => {
    navigate(ROUTE_PATHS.auth);
    sessionStorage.removeItem('userId');
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Count Money, can hide
        </a>
      ),
      key: '1',
      disabled: true,
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
