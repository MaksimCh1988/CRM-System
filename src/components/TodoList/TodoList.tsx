import React from 'react';
import { Todo } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';
import { List } from 'antd';

export interface TodoListProps {
  todos: Todo[];
  updateTodos: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, updateTodos }) => {
  return (
    <List size="large" style={{ width: '100%' }} bordered>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} updateTodos={updateTodos} />
      ))}
    </List>
  );
};
