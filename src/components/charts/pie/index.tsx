import { useState } from 'react';
import { Spin } from 'antd';
import { VictoryContainer, VictoryLabel, VictoryPie, VictoryTheme, VictoryTooltip } from 'victory';

import { TransitionType } from '@/types/transition';
import { getCapitalizeFirstLetter } from '@/utils/get-capitalize-first-letter';

import styles from './styles.module.css';

type Props = {
  height?: number;
  width?: number;
  data: TransitionType[];
  loading?: boolean;
};

export const PieChart = ({ data, height = 300, width = 300, loading = false }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (loading) {
    return (
      <div style={{ width, height }} className={styles.spinWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  const grouped = data.reduce<Record<string, { amount: number; color: string }>>((acc, item) => {
    const categoryName = item?.category?.name || 'Без категории';
    const chartColor = item?.category?.chartColor || '#ccc';

    if (!acc[categoryName]) {
      acc[categoryName] = { amount: item.amount, color: chartColor };
    } else {
      acc[categoryName].amount += item.amount;
    }

    return acc;
  }, {});

  const total = Object.values(grouped).reduce((sum, val) => sum + val.amount, 0);

  const chartData = Object.entries(grouped).map(([category, { amount, color }]) => {
    const percentage = ((amount / total) * 100).toFixed(2);
    return {
      x: category,
      y: amount,
      label: `${getCapitalizeFirstLetter(category)}\n ${amount} y.e. (${percentage}%)`,
      color,
    };
  });

  const hasData = !!chartData.length;

  return (
    <svg viewBox={`0 0 ${height} ${width}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <VictoryPie
        containerComponent={<VictoryContainer responsive={false} />}
        standalone={false}
        width={width}
        height={height}
        data={hasData ? chartData : [{ x: 'Нет данных', y: 1, label: 'Нет данных', color: '#eee' }]}
        innerRadius={hasData ? 68 : 60}
        labelRadius={hasData ? 100 : 80}
        theme={VictoryTheme.clean}
        style={{
          data: {
            fill: ({ datum }) => datum.color,
            opacity: ({ index }) => {
              if (!hasData) return 1;
              return activeIndex === null || activeIndex === index ? 1 : 0.5;
            },
            stroke: hasData ? undefined : '#ccc',
            strokeWidth: hasData ? 0 : 1,
          },
        }}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseOver: (_, props) => {
                setActiveIndex(props.index);
                return [
                  {
                    target: 'data',
                    mutation: () => ({ active: true }),
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: true }),
                  },
                ];
              },
              onMouseOut: () => {
                setActiveIndex(null);
                return [
                  {
                    target: 'data',
                    mutation: () => ({ active: false }),
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: false }),
                  },
                ];
              },
            },
          },
        ]}
        labelComponent={
          <VictoryTooltip
            constrainToVisibleArea
            flyoutStyle={{
              fill: '#fff',
              stroke: '#ccc',
              strokeWidth: 1,
            }}
            style={{ fontSize: 14, fill: '#333' }}
            cornerRadius={4}
            flyoutPadding={10}
          />
        }
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, fill: hasData ? '#000' : '#999' }}
        x={height / 2}
        y={width / 2}
        text={hasData ? `Всего:\n ${total} y.e.` : 'Нет данных'}
      />
    </svg>
  );
};
