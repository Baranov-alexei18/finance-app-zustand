/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { Button, Layout, Menu, notification } from 'antd';

import { ROUTE_PATHS } from '@/constants/route-path';
import { GET_USER_BY_ID } from '@/lib/graphQL/users';
import { NotificationType, useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';

import { HeaderApp } from '../header-app';
import { MENU_ITEMS } from './constants';

import styles from './styles.module.css';

const { Sider, Content } = Layout;

export const LayoutApp = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { notification: notificationData, removeNotification } = useNotificationStore();
  const { setUser } = useUserStore();

  const [fetchUserById] = useLazyQuery<any>(GET_USER_BY_ID);

  useEffect(() => {
    const id = sessionStorage.getItem('userId');

    if (id) {
      getUserById(id);
      return;
    }

    if (!id) {
      navigate(ROUTE_PATHS.auth);
    }
  }, [navigate]);

  useEffect(() => {
    if (notificationData?.type) {
      viewNotification(notificationData);
      removeNotification();
    }
  }, [notificationData]);

  const getUserById = async (id: string) => {
    if (!id) return;

    try {
      const { data } = await fetchUserById({ variables: { id } });

      setUser(data.authUser);
    } catch (e) {
      console.error(e);
      setUser([]);
    }
  };

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

  return (
    <Layout>
      {contextHolder}
      <Sider trigger={null} collapsible collapsed={collapsed} className={styles.siderWrapper}>
        <div className="demo-logo-vertical">
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className={styles.iconWrapper} />
              ) : (
                <MenuFoldOutlined className={styles.iconWrapper} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['home']}
          items={MENU_ITEMS}
          className={styles.menuWrapper}
        />
      </Sider>
      <Layout>
        <HeaderApp />
        <Content className={styles.contentWrapper}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
