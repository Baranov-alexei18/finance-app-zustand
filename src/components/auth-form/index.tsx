import type { FormProps } from 'antd';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import styles from './styles.module.css';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../lib/graphQL/users';
import { checkPassword } from '../../utils/check-password';
import { User } from '../../types/user';
import { useNavigate } from 'react-router';
import { PATHS } from '../../constants/route-path';
import { useNotificationStore } from '../../store/notificationStore';

type Props = {
  switchToRegister: () => void;
};

type AuthFormProps = {
  authUser: User;
};

export const AuthForm = ({ switchToRegister }: Props) => {
  const navigate = useNavigate();
  const { setNotification } = useNotificationStore();
  const [fetchUserByEmail, { loading }] = useLazyQuery<AuthFormProps>(GET_USER_BY_EMAIL);

  const onFinish: FormProps<User>['onFinish'] = async (values) => {
    if (!values.email || !values.password) {
      return;
    }

    try {
      const { data } = await fetchUserByEmail({ variables: { email: values.email } });

      if (!data?.authUser) {
        throw new Error('Не найден email');
      }

      const result = await checkPassword(values.password, data.authUser.password!);

      if (!result) {
        return;
      }

      setNotification({
        type: 'success',
        message: 'Успешный вход',
        description: 'Вы успешно вошли в систему.',
      });
      navigate(PATHS.home);
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed: FormProps<User>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.wrapperForm}
      >
        <Form.Item name="email" rules={[{ required: true, message: 'Введите email!' }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль!' }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button size="large" block type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
          <Button type="link" style={{ width: '100%' }} onClick={switchToRegister}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
