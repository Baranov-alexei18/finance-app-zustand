import { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Outlet } from 'react-router';
import { MENU_ITEMS } from './constants';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const { Header, Sider, Content } = Layout;

export const LayoutApp = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
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
        <Header className={styles.headerWrapper}>Personal Finance app</Header>
        <Content className={styles.contentWrapper}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
