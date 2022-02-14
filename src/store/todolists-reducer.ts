import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistApi} from "../api/todolist-api";

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


const initialState: Array<TodolistType> = [
    /*{id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to eat', filter: 'all'},*/
]


export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {

    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return todoLists.filter(el => el.id !== action.todoListId)

        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
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
    todolistApi.getTodos()
        .then(res => {
            res.data.forEach(el => {
                dispatch(addTodoListAC(el.title, el.id))
            })
        })
        .catch(err => {
            console.log(err)
        })

}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(title, res.data.data.item.id))
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const changeTodoListTitleTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistApi.editTodo(title, todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(title, todoListId))
            }
        })
        .catch(err => {
            console.log(err)
        })

}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }
        })
        .catch(err => {
            console.log(err)
        })
}