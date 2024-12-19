import React from 'react';
import { Todo } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

export interface TodoListProps {
  todos: Todo[];
  updateTodos: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, updateTodos }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem {...todo} updateTodos={updateTodos} />
        </li>
      ))}
    </ul>
  );
};
