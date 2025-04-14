import { AuthForm } from '../../components/auth-form';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import styles from './styles.module.css';
import { useState } from 'react';
import { RegisterForm } from '../../components/register-form';

export const AuthPage = () => {
  const [activeKey, setActiveKey] = useState('auth');

  const items: TabsProps['items'] = [
    {
      key: 'auth',
      label: 'Авторизация',
      children: <AuthForm switchToRegister={() => setActiveKey('register')} />,
    },
    {
      key: 'register',
      label: 'Регистрация',
      children: <RegisterForm switchToAuth={() => setActiveKey('auth')} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Tabs
        className={styles.formWrapper}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={items}
      />
    </div>
  );
};
