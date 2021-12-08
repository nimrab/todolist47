import {FilterValuesType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListAT
    | RemoveTodoListAT

export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {

    switch (action.type) {

        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)}

        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.taskTitle, isDone: false}

            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.taskTitle
                } : el)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todoListID]: []}

        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.todoListId]
            return newState

        default:
            return state
    }

}

type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

type AddTaskACType = {
    type: 'ADD-TASK'
    taskTitle: string
    todoListId: string
}

type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}

type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    taskTitle: string
    todoListId: string
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todoListId
    }
}

export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskACType => {
    return {
        type: 'ADD-TASK',
        taskTitle,
        todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusACType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todoListId: string): ChangeTaskTitleACType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        taskTitle,
        todoListId
    }
}

