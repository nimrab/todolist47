import axios from 'axios'
import {ResponseType} from './todoList-api'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    headers: {
        'API-KEY': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    },
    withCredentials: true,
})


export const authApi = {

    login(formData: LoginParamsType) {
        return instance.post<ResponseType<{userId: number}>>(`login`, formData)
    },

    me() {
        return instance.get<ResponseType<AuthMeResponseDataType>>(`me`)
    },

    logout() {
        return instance.delete<ResponseType<{}>>(`login`)
    }

}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type AuthMeResponseDataType = {
    id: number
    email: string
    login: string
}
