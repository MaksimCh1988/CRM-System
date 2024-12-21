import { useState } from 'react';
import { Todo } from '../../types/types';

import { editTodo, deleteTodo } from '../../API/todos';
import { List, Form, Input, Checkbox, FormProps, Button, Space } from 'antd';

interface TodoItemProps extends Todo {
  updateTodos: () => void;
}

type FieldType = {
  [id: number]: string;
};

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, isDone, updateTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formEdit] = Form.useForm();

  function toggleIsEditing() {
    setIsEditing((prev) => !prev);
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await editTodo(id, { title: values[id] });
      await updateTodos();
    } catch (error) {
      console.error('Error while adding a task:', error);
      throw error;
    }
    toggleIsEditing();
  };

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
    try {
      await deleteTodo(id);
      await updateTodos();
    } catch (error) {
      console.error('Error while deleting:', error);
      throw error;
    }
  }

  const rules = [
    { required: true, message: 'Введите задачу' },
    { min: 2, message: 'Не менее 2 символов' },
    { max: 64, message: 'Не более 64 символов' },
    {
      pattern: /^(?=.*[^\s]).*$/,
      message: 'Как минимум один символ, отличный от пробела',
    },
  ];

  return (
    <List.Item>
      <Form
        name={`${id}`}
        onFinish={onFinish}
        autoComplete="off"
        form={formEdit}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          gap: '5px',
        }}
        initialValues={{ [id]: title }}
      >
        {isEditing ? (
          <Form.Item
            name={id}
            rules={rules}
            style={{ width: '70%', marginBlock: '24px' }}
            validateTrigger={['onSubmit']}
          >
            <Input placeholder="Введите новую задачу" size="small" autoFocus />
          </Form.Item>
        ) : (
          <Checkbox
            onChange={handleToggleChecked}
            checked={isDone}
            style={{ textDecoration: isDone ? 'line-through' : '' }}
          >
            {title}
          </Checkbox>
        )}

        <Space.Compact>
          {isEditing ? (
            <>
              <Button size="small" onClick={() => formEdit.submit()}>
                💾
              </Button>
              <Button size="small" onClick={toggleIsEditing}>
                ❌
              </Button>
            </>
          ) : (
            <Button size="small" onClick={toggleIsEditing}>
              📝
            </Button>
          )}

          <Button size="small" onClick={handleDelete}>
            🗑️
          </Button>
        </Space.Compact>
      </Form>
    </List.Item>
  );
};
