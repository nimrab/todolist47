import {FilterValuesType, TodolistType} from "../App";
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {changeAppStatusAC, RequestStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}


export type ChangeTodoListStatusAT = {
    type: 'CHANGE-TODOLIST-STATUS'
    id: string
    status: RequestStatusType
}


/*
export const todolistId_1 = v1()
export const todolistId_2 = v1()
*/


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to eat', filter: 'all'},*/
]


export const statusCode = {
    success: 0,
    error: 1
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    loadingStatus: RequestStatusType
}

export type TodoListsActionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | ChangeTodoListStatusAT

export const todolistsReducer = (todoLists: Array<TodolistDomainType> = initialState, action: TodoListsActionType): Array<TodolistDomainType> => {

    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return todoLists.filter(el => el.id !== action.todoListId)

        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all',
                loadingStatus: 'idle'
            }
            return [...todoLists, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(el => el.id === action.id ? {...el, title: action.title} : el)

        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)

        case 'CHANGE-TODOLIST-STATUS':
            return todoLists.map(el => el.id === action.id ? {...el, loadingStatus: action.status} : el)

        default:
            return todoLists
    }
}


export const changeLoadingStatusAC = (id: string, status: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-STATUS',
        id,
        status
    } as const
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}


export const addTodoListAC = (title: string, todoListId: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListId
        //todoListID: v1()
    } as const
}

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    } as const
}


export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: id
    } as const
}

export const getTodoListTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    todolistApi.getTodos()
        .then(res => {
            res.data.reverse().forEach(el => {
                dispatch(addTodoListAC(el.title, el.id))
            })
        })
        .catch(err => {
            handleServerAppError(dispatch, err.data)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    todolistApi.createTodo(title)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(addTodoListAC(title, res.data.data.item.id))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
        })
}

export const changeTodoListTitleTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId,'loading'))
    todolistApi.editTodo(title, todoListId)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(changeTodoListTitleAC(title, todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId,'idle'))
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId,'loading'))
    todolistApi.deleteTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(removeTodoListAC(todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId,'idle'))
        })
}


