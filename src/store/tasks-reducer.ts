import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, todolistId_1, todolistId_2} from "./todolists-reducer";


export type ActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListAT
    | RemoveTodoListAT


const initialState: TaskStateType = {
    /*  [todolistId_1]: [
          {id: v1(), title: "HTML", isDone: true},
          {id: v1(), title: "CSS", isDone: false},
          {id: v1(), title: "JS", isDone: false},
          {id: v1(), title: "React", isDone: true},
          {id: v1(), title: "TypeScript", isDone: true},
          {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistId_2]: [
          {id: v1(), title: "Meat", isDone: true},
          {id: v1(), title: "Pasta", isDone: true},
          {id: v1(), title: "Coca-Cola", isDone: false},
          {id: v1(), title: "Whiskey", isDone: true},
          {id: v1(), title: "Bread", isDone: false},
      ],*/
}


export const taskReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {

    switch (action.type) {

        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)}

        case 'ADD-TASK':
            const newTask = {id: action.taskId, title: action.taskTitle, isDone: action.isDone}

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
            return {...state, [action.todoListId]: []}

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
    taskId: string
    taskTitle: string
    todoListId: string
    isDone: boolean
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

export const addTaskAC = (taskTitle: string, todoListId: string, taskId: string, isDone: boolean): AddTaskACType => {
    return {
        type: 'ADD-TASK',
        taskTitle,
        todoListId,
        isDone,
        taskId
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

