/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Button, Form, Input, Typography, Upload } from 'antd';

import { EDIT_USER, REGISTER_CREATE_USER } from '@/lib/graphQL/users';
import { useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import { checkPassword } from '@/utils/check-password';
import { getHashPassword } from '@/utils/getHashPassword';
import { uploadFileToHygraph } from '@/utils/upload-file-to-hygraph';

import styles from './styles.module.css';

const MAX_FILE_SIZE_MB = 5;
type EditFormProps = {
  updateAuthUser: { id: string };
};

export const EditProfileForm = () => {
  const { user } = useUserStore();
  const { setNotification } = useNotificationStore();
  const [form] = Form.useForm();
  const [editUser, { loading }] = useMutation<EditFormProps>(EDIT_USER);
  const [publishUser] = useMutation(REGISTER_CREATE_USER);

  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || '');
  const [file, setFile] = useState<File | null>(null);

  const beforeUpload = (file: File) => {
    const isLt5M = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
    if (!isLt5M) {
      setNotification({
        type: 'error',
        message: 'Ошибка',
        description: 'Файл должен быть меньше 5MB',
      });

      return false;
    }
    return isLt5M;
  };

  const handleAvatarChange = (info: any) => {
    const file = info.file;

    console.log(file);

    if (file && beforeUpload(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const onFinish = async (values: any) => {
    const { name, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      setNotification({
        type: 'error',
        message: 'Ошибка',
        description: 'Пароли не совпадают',
      });

      return;
    }

    try {
      const hashPassword = await getHashPassword(values.newPassword);

      if (file) {
        const data = await uploadFileToHygraph(file);
        console.log('uploadFileToHygraph');
        console.log(data);
      }

      const formData = {
        name: name || user.name,
        password: hashPassword,
        // avatar: {
        //   connect: { id: assetId },
        // },
      };

      const { data } = await editUser({
        variables: {
          id: user.id,
          data: formData,
        },
      });

      console.log(data);

      const { data: userId } = await publishUser({
        variables: { id: data?.updateAuthUser.id },
      });

      if (!userId) {
        throw new Error('Не удалось сохранить обновить данные пользователя');
      }

      setNotification({
        type: 'success',
        message: 'Успешно сохранено',
        description: 'Профиль успешно обновлен',
      });
    } catch (e) {
      console.error(e);

      setNotification({
        type: 'error',
        message: 'Профиль не обновлен',
        description: String(e),
      });
    }
  };

  const validateOldPassword = async (_: any, value: string) => {
    if (!value) {
      return Promise.reject('Введите старый пароль');
    }

    const result = await checkPassword(value, user.password!);

    if (!result) {
      return Promise.reject('Неверный старый пароль');
    }

    return Promise.resolve();
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperAvatar}>
        <Typography.Title level={2}>Редактировать профиль</Typography.Title>
        <Upload showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
          <Avatar
            size={128}
            src={avatarUrl || user?.avatar?.url || 'null'}
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
        </Upload>
        <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
          Нажмите на фото, чтобы изменить
        </Typography.Paragraph>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} className={styles.wrapperForm}>
        <Form.Item label="Имя" name="name" initialValue={user?.name || ''}>
          {<Input size="large" />}
        </Form.Item>

        <Form.Item
          label="Старый пароль"
          name="oldPassword"
          rules={[{ validator: validateOldPassword }]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Новый пароль"
          name="newPassword"
          rules={[
            { required: true, message: 'Введите новый пароль' },
            { min: 4, message: 'Пароль должен содержать минимум 4 символа' },
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Подтвердите новый пароль"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Подтвердите новый пароль' },
            { min: 4, message: 'Пароль должен содержать минимум 4 символа' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={loading}>
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
