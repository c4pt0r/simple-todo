import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { mockUncompletedTasks, mockCompletedTasks } from './mockData'

axios.defaults.headers.post['Content-Type'] = 'application/json';

export enum StatusFilter {
  All = 1,
  UNCOMPLETED = 2,
  COMPLETED = 3,
}

export async function request(options: AxiosRequestConfig) {
  try {
    const response = await axios(options);
    const res = response.data;

    if (res.c !== 0) {
      toast.warning('Something wrong with the BUSINESS');
    }

    return res;
  } catch (err) {
    toast.error('Something wrong with the NETWORK');
    throw err
  }
}

interface GetTodosParams {
  limit?: string | number
  statusFilter?: StatusFilter
}
export async function getTodos(params: GetTodosParams) {
  /** mock start 
  if (params.statusFilter === StatusFilter.All) {
    return [...mockUncompletedTasks, ...mockCompletedTasks]
  } else if (params.statusFilter === StatusFilter.UNCOMPLETED) {
    return [...mockUncompletedTasks]
  } else if (params.statusFilter === StatusFilter.COMPLETED) {
    return [...mockCompletedTasks]
  }
  */
  /** mock end */

  // TODO: uncomment these lines to use the real data from the api
  const { d } = await request({
    url: '/api/todos',
    method: 'GET',
    params,
  })
  return d;
}

interface PostTodoData {
  title: string
}
export async function postTodo(data: PostTodoData) {
  const { c, d } = await request({
    url: '/api/todo',
    method: 'POST',
    data,
  })
  c === 0 && toast.success('🌟 Created!')
  return d;
}

interface DelTodoData {
  id: string
}
export async function delTodo(data: DelTodoData) {
  const { c } = await request({
    url: '/api/todo',
    method: 'DELETE',
    data,
  })
  c === 0 && toast.success('🌟 Deleted!')
}

interface PatchTodoData {
  id: string
  title?: string
  completed?: boolean
}
export async function patchTodo(data: PatchTodoData) {
  const { c, d } = await request({
    url: '/api/todo',
    method: 'PATCH',
    data,
  })
  c === 0 && toast.success('🌟 Updated!')
  return d;
}
