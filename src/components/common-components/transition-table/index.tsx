import { Table, Tag } from 'antd';

import { TransitionEnum, TransitionType } from '@/types/transition';

type Props = {
  transitions: TransitionType[];
};

export const TransitionTable = ({ transitions }: Props) => {
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type: TransitionEnum) => (
        <Tag color={type === TransitionEnum.INCOME ? 'green' : 'red'}>
          {type === TransitionEnum.INCOME ? 'Доход' : 'Расход'}
        </Tag>
      ),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${amount} y.e.`,
    },
    {
      title: 'Категория',
      key: 'category',
      render: (record: TransitionType) => record.category?.name || '-',
    },
    {
      title: 'Описание',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={transitions}
      pagination={{
        pageSizeOptions: ['5', '10', '15', '20'],
        defaultPageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      style={{ width: '100%' }}
    />
  );
};
