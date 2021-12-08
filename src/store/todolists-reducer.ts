import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
    todoListID: string
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


export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {

    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return todoLists.filter(el => el.id !== action.todoListId)

        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: action.todoListID,
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

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListId} as const
}


export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListID: v1()
    } as const
}

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    } as const
}


export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: id
    } as const
}




