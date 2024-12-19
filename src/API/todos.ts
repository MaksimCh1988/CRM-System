import { MetaResponse, Todo, TodoInfo, Filters, TodoRequest } from '../types/types';

export async function getTodos(
  filter: Filters
): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching:', error);
  }
}

export async function addTodo(todo: TodoRequest): Promise<Todo | undefined> {
  try {
    const response = await fetch('https://easydev.club/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

export async function editTodo(
  idTodo: number,
  todo: TodoRequest
): Promise<Todo | undefined> {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${idTodo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing todo:', error);
  }
}
