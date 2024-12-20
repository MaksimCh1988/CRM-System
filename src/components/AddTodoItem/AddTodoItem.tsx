import React from 'react';
import { addTodo } from '../../API/todos';
import { Form, Input, Button, FormProps, Space } from 'antd';

interface AddTodoItemProps {
  updateTodos: () => void;
}

type FieldType = {
  taskname: string;
};

export const AddTodoItem: React.FC<AddTodoItemProps> = ({ updateTodos }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await addTodo({ title: values.taskname, isDone: false });
      await updateTodos();
    } catch (error) {
      console.error('Error while adding a task:', error);
      throw error;
    }
    form.resetFields(['taskname']);
  };

  const rules = [
    { required: true, message: 'Введите задачу' },
    { min: 2, message: 'Не менее 2 символов' },
    { max: 64, message: 'Не более 64 символов' },
    {
      pattern: /^(?=.*[^\s]).*$/,
      message: 'Задача должна содержать как минимум один символ, отличный от пробела',
    },
  ];

  return (
    <Form
      name="todoAdder"
      onFinish={onFinish}
      autoComplete="off"
      style={{ width: '100%' }}
      form={form}
    >
      <Space.Compact block>
        <Form.Item
          name="taskname"
          rules={rules}
          style={{ width: '80%' }}
          validateTrigger={['onSubmit', 'onChange']}
        >
          <Input placeholder="Введите новую задачу" size="large" />
        </Form.Item>
        <Form.Item style={{ width: '20%' }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ maxWidth: '100%' }}
          >
            Добавить
          </Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};
