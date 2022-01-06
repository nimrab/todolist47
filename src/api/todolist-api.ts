import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    }
})

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
/*
type CreateTodoType = {
    data: {
        item: TodoType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}


type DeleteTodoType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type DeleteAndUpdateTodoType = {
    data: {}
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}*/

type ResponseType<T> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}


export const todolistApi = {

    getTodos() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },

    createTodo() {
        const title = 'NewTodoList'
        return instance.post<'',ResponseType<{item: TodoType}>, {title: string}>('/todo-lists', {title})
        //выше дополнительно типизирыем передаваемые значения title (редко используется)
    },

    deleteTodo() {
        const todolistId = '';
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
    },

    updateTodoTitle() {
        const todolistId = ''
        return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'})
    },


}