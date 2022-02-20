import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";
import {changeStatusAC} from "./app-reducer";
import {handleServerAppError} from "../utils/error-utils";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType
    id: string
}


export const todolistId_1 = v1()
export const todolistId_2 = v1()


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
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return todoLists.filter(el => el.id !== action.todoListId)

        case 'ADD-TODOLIST':
            const newTodoList: TodolistDomainType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(el => el.id === action.id ? {...el, title: action.title} : el)

        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)

        default:
            return todoLists
    }

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
    dispatch(changeStatusAC('loading'))
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
            dispatch(changeStatusAC('idle'))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC('loading'))
    todolistApi.createTodo(title)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(addTodoListAC(title, res.data.data.item.id))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerAppError(dispatch, err.data)
        })
        .finally(() => {
            dispatch(changeStatusAC('idle'))
        })
}

export const changeTodoListTitleTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC('loading'))
    todolistApi.editTodo(title, todoListId)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(changeTodoListTitleAC(title, todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerAppError(dispatch, err.data)
        })
        .finally(() => {
            dispatch(changeStatusAC('idle'))
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC('loading'))
    todolistApi.deleteTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(removeTodoListAC(todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerAppError(dispatch, err.data)
        })
        .finally(() => {
            dispatch(changeStatusAC('idle'))
        })
}


