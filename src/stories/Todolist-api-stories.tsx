import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '7be99c63-5a64-429e-83a0-e1cc010cb04c'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
            // здесь мы будем делать запрос и ответ закидывать в стейт.
            // который в виде строки будем отображать в div-ке
            /*let promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                withCredentials: true
            })*/
        todolistApi.getTodos()
            .then((response) => {
                setState(response.data)
            })
            //axios вернет promise и запишет его в переменную

        }
        , [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistApi.createTodo()
        .then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    todolistApi.deleteTodo()
        .then((res) => {
        setState(res.data);
    })

    useEffect(() => {
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistApi.updateTodoTitle()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
