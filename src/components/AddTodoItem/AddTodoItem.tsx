import React from 'react';
import { useState } from 'react';
import { todoTextValidation } from '../../helpers/todoTextValidation';
import styles from './AddTodoItem.module.scss';
import { addTodo } from '../../API/todos';

interface AddTodoItemProps {
  updateTodos: () => void;
}

export const AddTodoItem: React.FC<AddTodoItemProps> = ({ updateTodos }) => {
  const [inputValue, setInputValue] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskValue = formData.get('addtask') as string;
    const MIN_TODO_LENGTH = 2;
    const MAX_TODO_LENGTH = 64;
    if (todoTextValidation(taskValue, MIN_TODO_LENGTH, MAX_TODO_LENGTH)) {
      try {
        await addTodo({ title: taskValue, isDone: false });
        await updateTodos();
      } catch (error) {
        console.error('Error handle submit while adding:', error);
        throw error;
      }
      setInputValue('');
    } else {
      alert(
        `Задача должна содержать от ${MIN_TODO_LENGTH} до ${MAX_TODO_LENGTH} символов`
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoItem}>
      <input
        type="text"
        name="addtask"
        id="addtask"
        required
        placeholder="Введите задачу"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
