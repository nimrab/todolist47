import axios, {Axios, AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    },
    withCredentials: true,
})


export const todolistApi = {

    getTodos() {
        return instance.get<Array<TodoType>>(`todo-lists`)
    }



}




type TodoType = {
    addedData: string
    id: string
    order: number
    title: string
}