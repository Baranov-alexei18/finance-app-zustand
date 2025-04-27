/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import dayjs from 'dayjs';

import { CreateCategoryModal } from '@/components/common-components/create-category-modal';
import { CREATE_CATEGORY, REGISTER_CREATE_CATEGORY } from '@/lib/graphQL/category';
import { CREATE_TRANSITION, REGISTER_CREATE_TRANSITION } from '@/lib/graphQL/transition';
import { useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import { TransitionEnum } from '@/types/transition';

import styles from './styles.module.css';

type Props = {
  title: string;
  type: TransitionEnum;
};

type TransitionFormProps = {
  createTransition: { id: string };
};

type CategoryFormProps = {
  createCategory: { id: string };
};

export const TransitionForm = ({ title, type }: Props) => {
  const { user, getCategoriesByType } = useUserStore();
  const { setNotification } = useNotificationStore();

  const [createTransition, { loading }] = useMutation<TransitionFormProps>(CREATE_TRANSITION);
  const [publishTransition] = useMutation(REGISTER_CREATE_TRANSITION);

  const [createCategory, { loading: loadingCategory }] =
    useMutation<CategoryFormProps>(CREATE_CATEGORY);
  const [publishCategory] = useMutation(REGISTER_CREATE_CATEGORY);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = getCategoriesByType(TransitionEnum[type]).map(
    (item) => ({
      value: item.id,
      label: item.name,
    }),
    []
  );
  const [form] = Form.useForm();

  console.log('globalUser');
  console.log(user);

  const onFinish = async (values: any) => {
    const formattedDate = values.date ? dayjs(values.date).format('YYYY-MM-DD') : null;
    const formData = {
      authUser: {
        connect: { id: user?.id },
      },
      category: {
        connect: { id: values.category },
      },
      type: type,
      date: formattedDate,
      amount: Number(values.amount),
      note: values.note || null,
    };

    try {
      const { data } = await createTransition({
        variables: { data: formData },
      });

      if (!data?.createTransition.id) {
        throw new Error('Не удалось создать пользователя');
      }

      const { data: transitionId } = await publishTransition({
        variables: { id: data.createTransition.id },
      });

      if (!transitionId) {
        throw new Error('Не удалось сохранить учетную запись пользователя');
      }

      setNotification({
        type: 'success',
        message: 'Успешно сохранено',
        description: 'Статья доходов создана',
      });

      handleReset();
    } catch (e) {
      console.error('❌ Ошибка входа:', e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('❌ Ошибка формы:', errorInfo);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleAddCategory = async (newCategory: string, color: string) => {
    if (newCategory.trim() && user) {
      const value = newCategory.trim().toLowerCase().replace(/\s+/g, '-');

      const formData = {
        authUser: {
          connect: { id: user?.id },
        },
        type: type,
        name: value,
        chartColor: color,
      };

      try {
        const { data } = await createCategory({
          variables: { data: formData },
        });

        if (!data?.createCategory.id) {
          throw new Error('Не удалось сохранить новую катугорию');
        }

        const { data: categoryId } = await publishCategory({
          variables: { id: data.createCategory.id },
        });

        if (!categoryId) {
          throw new Error('Не удалось сохранить новую катугорию');
        }

        setNotification({
          type: 'success',
          message: 'Успешно сохранено',
          description: 'Новая категория создана',
        });

        handleCloseModal();
      } catch (e) {
        console.error('❌ Ошибка:', e);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Typography.Title level={2}>{title}</Typography.Title>

      <Form
        form={form}
        name="transition"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.wrapperForm}
        initialValues={{
          date: dayjs(),
          category: null,
          goal: null,
          amount: '',
          comment: '',
        }}
      >
        <Form.Item name="date" rules={[{ required: true, message: 'Обязательно' }]}>
          <DatePicker size="large" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="category" rules={[{ required: true, message: 'Обязательно' }]}>
          <Select
            showSearch
            size="large"
            placeholder="Категория"
            options={[
              ...categories,
              { label: 'Добавить новую категорию', value: 'add_new_category' },
            ]}
            onSelect={(value) => {
              if (value === 'add_new_category') {
                setIsModalOpen(true);
              }
            }}
            filterOption={(input, option) =>
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(a, b) =>
              (a.label as string).toLowerCase().localeCompare((b.label as string).toLowerCase())
            }
            allowClear
          />
        </Form.Item>

        {type === TransitionEnum.INCOME && (
          <Form.Item name="goal">
            <Select
              showSearch
              size="large"
              placeholder="Цель"
              options={categories}
              defaultValue={null}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
            />
          </Form.Item>
        )}

        <Form.Item
          name="amount"
          rules={[{ required: true, message: 'Обязательно' }]}
          normalize={(value) => value.replace(/[^\d]/g, '')}
        >
          <Input size="large" placeholder="Сумма (только цифры)" />
        </Form.Item>

        <Form.Item name="note">
          <Input size="large" placeholder="Комментарий" />
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" loading={loading}>
            Сохранить
          </Button>
          <Button size="large" type="default" onClick={handleReset} className={styles.cancelButton}>
            Очистить
          </Button>
        </Form.Item>
      </Form>
      <CreateCategoryModal
        type={type}
        loading={loadingCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};
