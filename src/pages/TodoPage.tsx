import { useState, useEffect } from 'react';

import { Filters, Todo, TodoInfo } from '../types/types';

import { AddTodoItem } from '../components/AddTodoItem/AddTodoItem';
import { ListFilter } from '../components/ListFilter/ListFilter';
import { TodoList } from '../components/TodoList/TodoList';

import { getTodos } from '../API/todos';

import { Flex } from 'antd';

export const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [statistic, setStatistic] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  async function updateTodos() {
    try {
      const responseData = await getTodos(filter);
      if (responseData && responseData.data && responseData.info) {
        setTodos(responseData.data);
        setStatistic(responseData.info);
      }
    } catch (error) {
      console.error('Error updating todos:', error);
      throw error;
    }
  }

  useEffect(() => {
    updateTodos();
  }, []);

  useEffect(() => {
    updateTodos();
  }, [filter]);

  return (
    <Flex vertical gap="small" style={{ margin: '2rem auto', maxWidth: '500px' }}>
      <AddTodoItem updateTodos={updateTodos} />
      <ListFilter statistic={statistic} changeFilter={setFilter} />
      <TodoList todos={todos} updateTodos={updateTodos} />
    </Flex>
  );
};
