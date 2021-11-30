import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
    id: string
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
            return todoLists.filter(el => el.id !== action.id)

        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: action.id,
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

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: id}
}


export const AddTodoListAC = (title: string, id: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        id: id
    }
}

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    }
}


export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: id
    }
}




