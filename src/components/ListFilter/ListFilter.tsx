import React from 'react';
import { TodoInfo, Filters } from '../../types/types';
import { Space, Button } from 'antd';

interface ListFilterProps {
  statistic: TodoInfo;
  changeFilter: (value: Filters) => void;
}

export const ListFilter: React.FC<ListFilterProps> = ({ statistic, changeFilter }) => {
  const filters = [
    { label: 'Все', count: statistic.all, value: Filters.all },
    { label: 'В работе', count: statistic.inWork, value: Filters.inWork },
    { label: 'Сделано', count: statistic.completed, value: Filters.completed },
  ];

  const handleFilterChange = (filterValue: Filters) => () => changeFilter(filterValue);

  return (
    <Space.Compact block size="large">
      {filters.map(({ label, count, value }) => (
        <Button
          key={value}
          size="large"
          style={{ width: '33.3%' }}
          onClick={handleFilterChange(value)}
        >
          {`${label} (${count})`}
        </Button>
      ))}
    </Space.Compact>
  );
};
