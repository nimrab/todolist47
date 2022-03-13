import axios from 'axios'


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    },
    withCredentials: true,
})


export const todoListApi = {

    getTodos() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    },

    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodoType}>>(`todo-lists`, {title})
    },

    deleteTodo(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },

    editTodo( title: string, id: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
    }


}


export type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<T> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: string[]
    data: T
}