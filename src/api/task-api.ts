import axios from 'axios'
import {ResponseType} from './todoList-api'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {
        'API-KEY': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    },
    withCredentials: true,
})

export const taskApi = {

    getTasks(todoListId: string) {
        return instance.get<TaskType>(`${todoListId}/tasks`)
    },

    addTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: ItemType }>>(`${todoListId}/tasks`, {title})
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`${todoListId}/tasks/${taskId}`)
    },

    editTaskTitleOrStatus(todoListId: string, taskId: string, title: string, isDone: boolean) {
        const payload = {
            title,
            status: isDone ? 1 : 0,
        }
        return instance.put<ResponseType<{ item: ItemType }>>(`${todoListId}/tasks/${taskId}`, payload)
    }

}

type TaskType = {
    items: Array<ItemType>
    totalCount: number
    error: string | null
}

export type ItemType = {
    description: string | null
    title: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

