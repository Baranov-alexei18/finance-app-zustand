import { Avatar, Layout, Dropdown, Space, Button, MenuProps } from 'antd';
import styles from './styles.module.css';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { PATHS } from '../../constants/route-path';

import { useUserStore } from '../../store/userStore';

const { Header } = Layout;

export const HeaderApp = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleExit = () => {
    navigate(PATHS.auth);
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
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Редактировать
        </a>
      ),
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
              icon={<UserOutlined />}
              //   icon={1 === '1' ? <UserOutlined /> : <img src="/avatar.jpg" alt="Avatar" />}
            />
            {user?.name || 'Accoun Name or email'}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
};
