import axios from "axios";


export const todolistApi = {

    settings: {
        headers: {
            'api-key': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
        }
    },

    getTodos() {
        let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            withCredentials: true
        })
        return promise
    },

    createTodo() {

        const title = 'NewTodoList'


        let promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title}, this.settings)
        return promise
    },

    deleteTodo() {
        const todolistId = '';

        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, this.settings)
        return promise
    },

    updateTodoTitle() {

        const todolistId = ''
        let promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'}, this.settings)

        return promise
    },


}