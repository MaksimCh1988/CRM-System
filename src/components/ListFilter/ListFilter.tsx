import React from 'react';
import { TodoInfo, Filters } from '../../types/types';
import styles from './ListFilter.module.scss';

interface ListFilterProps {
  statistic: TodoInfo;
  currentFilter: Filters;
  changeFilter: (value: Filters) => void;
}

export const ListFilter: React.FC<ListFilterProps> = ({ statistic, changeFilter, currentFilter }) => {
  const filters = [
    { label: 'Все', count: statistic.all, value: Filters.all },
    { label: 'В работе', count: statistic.inWork, value: Filters.inWork },
    { label: 'Сделано', count: statistic.completed, value: Filters.completed }
  ];

  const handleFilterChange = (filterValue: Filters) => () => changeFilter(filterValue);

  return (
    <div className={styles.listFilter}>
      {filters.map(({ label, count, value }) => (
        <button
          key={value}
          className={`${styles.button} ${currentFilter === value ? styles.buttonActive : ''}`}
          onClick={handleFilterChange(value)}
        >
          {`${label} (${count})`}
        </button>
      ))}
    </div>
  );
};
