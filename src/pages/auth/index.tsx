import { AuthForm } from '../../components/auth-form';
import { notification, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { RegisterForm } from '../../components/register-form';
import { NotificationType, useNotificationStore } from '../../store/notificationStore';

export const AuthPage = () => {
  const [activeKey, setActiveKey] = useState('auth');
  const { notification: notificationData, removeNotification } = useNotificationStore();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (notificationData?.type) {
      viewNotification(notificationData);
      removeNotification();
    }
  }, [notificationData]);

  const viewNotification = (data: NotificationType | null) => {
    if (!data) return;

    const { type, message, description } = data;

    if (type === 'error') {
      api.error({
        message,
        description,
      });
    } else if (type === 'success') {
      api.success({
        message,
        description,
      });
    }
  };

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
      {contextHolder}
      <Tabs
        className={styles.formWrapper}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={items}
      />
    </div>
  );
};
