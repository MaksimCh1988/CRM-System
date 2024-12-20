import { useState } from 'react';
import { Todo } from '../../types/types';
import { todoTextValidation } from '../../helpers/todoTextValidation';
import { editTodo, deleteTodo } from '../../API/todos';
import styles from './TodoItem.module.scss';

interface TodoItemProps extends Todo {
  updateTodos: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, isDone, updateTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);

  function toggleIsEditing() {
    setIsEditing((prev) => !prev);
    setInputValue(title);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskValue = formData.get('todoTextInput') as string;
    const MIN_TODO_LENGTH = 2;
    const MAX_TODO_LENGTH = 64;
    if (todoTextValidation(taskValue, MIN_TODO_LENGTH, MAX_TODO_LENGTH)) {
      try {
        await editTodo(id, { title: taskValue, isDone: isDone });
        await updateTodos();
      } catch (error) {
        console.error('Error handle submit while editing:', error);
        throw error;
      }
      toggleIsEditing();
    } else {
      alert(
        `Задача должна содержать от ${MIN_TODO_LENGTH} до ${MAX_TODO_LENGTH} символов`
      );
    }
  }

  async function handleToggleChecked() {
    try {
      await editTodo(id, { isDone: !isDone });
      await updateTodos();
    } catch (error) {
      console.error('Error handle toggle checked:', error);
      throw error;
    }
  }

  async function handleDelete() {
    await deleteTodo(id);
    updateTodos();
  }

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoTitle}>
        {isEditing ? (
          <form id="todoTextForm" onSubmit={handleSubmit}>
            <input
              name="todoTextInput"
              className={styles.todoTextInput}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите задачу"
            />
          </form>
        ) : (
          <>
            <label className={isDone ? styles.todoLabelChecked : styles.todoLabel}>
              <input
                className={styles.customCheckbox}
                type="checkbox"
                name={title}
                checked={isDone}
                onChange={handleToggleChecked}
              />
              {title}
            </label>
          </>
        )}
      </div>

      <div className={styles.buttonsPanel}>
        {isEditing ? (
          <>
            <button className={styles.buttonBlue} type="submit" form="todoTextForm">
              💾
            </button>
            <button className={styles.buttonBlue} onClick={toggleIsEditing}>
              ❌
            </button>
          </>
        ) : (
          <button className={styles.buttonBlue} onClick={toggleIsEditing}>
            📝
          </button>
        )}

        <button className={styles.buttonRed} onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};
