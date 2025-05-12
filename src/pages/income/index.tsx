import { useEffect, useMemo } from 'react';
import { BaseCardLayout } from '@components/common-components/base-card-layout';
import { TransitionForm } from '@components/forms/transition-form';
import { NotificationType, useNotificationStore } from '@store/notificationStore';
import { Flex, notification } from 'antd';

import { ExplorerChart } from '@/components/charts/explorer';
import { PieChart } from '@/components/charts/pie';
import { TransitionTable } from '@/components/common-components/transition-table';
import { useUserStore } from '@/store/userStore';
import { TransitionEnum } from '@/types/transition';

import styles from './styles.module.css';

export const IncomePage = () => {
  const { notification: notificationData, removeNotification } = useNotificationStore();
  const [api] = notification.useNotification();
  const { user, getTransactionsByType, loading } = useUserStore();

  const incomeTransitions = useMemo(
    () => getTransactionsByType(TransitionEnum.INCOME),
    [getTransactionsByType, user]
  );

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
        <BaseCardLayout>
          <PieChart height={370} width={370} data={incomeTransitions} loading={loading} />
        </BaseCardLayout>
      </Flex>
      <BaseCardLayout>
        <ExplorerChart height={600} width={1000} data={incomeTransitions} loading={loading} />
      </BaseCardLayout>
      <BaseCardLayout>
        <TransitionTable transitions={incomeTransitions} />
      </BaseCardLayout>
    </div>
  );
};
