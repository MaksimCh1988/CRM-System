import axios from 'axios';
import { MetaResponse, Todo, TodoInfo, Filters, TodoRequest } from '../types/types';

const url = 'https://easydev.club/api/v1/todos';

export async function getTodos(
  filter: Filters
): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
  try {
    const response = await axios.get(`${url}?filter=${filter}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
}

export async function addTodo(todo: TodoRequest): Promise<Todo | undefined> {
  try {
    const response = await axios.post(url, todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

export async function editTodo(
  idTodo: number,
  todo: TodoRequest
): Promise<Todo | undefined> {
  try {
    const response = await axios.put(`${url}/${idTodo}`, todo);
    return response.data;
  } catch (error) {
    console.error('Error editing todo:', error);
    throw error;
  }
}
