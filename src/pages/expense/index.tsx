import { useEffect, useMemo } from 'react';
import { Flex, notification } from 'antd';

import { BaseCardLayout } from '@/components/common-components/base-card-layout';
import { TransitionTable } from '@/components/common-components/transition-table';
import { TransitionForm } from '@/components/forms/transition-form';
import { NotificationType, useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import { TransitionEnum } from '@/types/transition';

import styles from './styles.module.css';

export const ExpensePage = () => {
  const { notification: notificationData, removeNotification } = useNotificationStore();
  const [api] = notification.useNotification();

  const { user, getTransactionsByType, loading } = useUserStore();

  useEffect(() => {
    if (notificationData?.type) {
      viewNotification(notificationData);
      removeNotification();
    }
  }, [notificationData]);

  const expenseTransitions = useMemo(
    () => getTransactionsByType(TransitionEnum.EXPENSE),
    [getTransactionsByType, user]
  );

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <Flex className={styles.wrapperDashboard}>
        <BaseCardLayout>
          <TransitionForm title="Расходы" type={TransitionEnum.EXPENSE} />
        </BaseCardLayout>
        <BaseCardLayout>12341</BaseCardLayout>
      </Flex>
      <BaseCardLayout>
        <TransitionTable transitions={expenseTransitions} />
      </BaseCardLayout>
    </div>
  );
};
