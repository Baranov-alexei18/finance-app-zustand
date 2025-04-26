import { useEffect } from 'react';
import { BaseCardLayout } from '@components/common-components/base-card-layout';
import { TransitionForm } from '@components/forms/transition-form';
import { NotificationType, useNotificationStore } from '@store/notificationStore';
import { Flex, notification } from 'antd';

import { TransitionEnum } from '@/types/transition';

import styles from './styles.module.css';

export const IncomePage = () => {
  const { notification: notificationData, removeNotification } = useNotificationStore();
  const [api] = notification.useNotification();

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

  return (
    <div className={styles.wrapper}>
      <Flex className={styles.wrapperDashboard}>
        <BaseCardLayout>
          <TransitionForm title="Доходы" type={TransitionEnum.INCOME} />
        </BaseCardLayout>
        <BaseCardLayout>12341</BaseCardLayout>
      </Flex>
    </div>
  );
};
