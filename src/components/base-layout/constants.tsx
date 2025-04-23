import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router';

export const MENU_ITEMS = [
  {
    key: 'home',
    icon: <UserOutlined />,
    label: (
      <NavLink to="/" end>
        Home
      </NavLink>
    ),
  },
  {
    key: '',
    icon: <VideoCameraOutlined />,
    label: (
      <NavLink to="/" end>
        Income
      </NavLink>
    ),
  },
  {
    key: '',
    icon: <VideoCameraOutlined />,
    label: (
      <NavLink to="/" end>
        Expense
      </NavLink>
    ),
  },
  {
    key: '',
    icon: <VideoCameraOutlined />,
    label: (
      <NavLink to="/" end>
        Goal
      </NavLink>
    ),
  },
];
