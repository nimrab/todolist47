import {
    AddTodoListAT,
    changeLoadingStatusAC,
    ChangeTodoListStatusAT,
    RemoveTodoListAT,
    statusCode
} from './todoLists-reducer'
import {Dispatch} from 'redux'
import {ItemType, taskApi} from '../api/task-api'
import {changeAppStatusAC, ChangeAppStatusAT} from './app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils'
import {TaskStateType} from '../app/App'

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
type setTasksAT = ReturnType<typeof setTasksAC>

export type TasksActionType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodoListAT
    | RemoveTodoListAT
    | ChangeAppStatusAT
    | ChangeTodoListStatusAT
    | setTasksAT


const initialState: TaskStateType = {
    /*  [todolistId_1]: [
          {id: v1(), title: "HTML", isDone: true},
          {id: v1(), title: "CSS", isDone: false},
      ],
      [todolistId_2]: [
          {id: v1(), title: "Meat", isDone: true},
          {id: v1(), title: "Pasta", isDone: true},
      ],*/
}

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionType): TaskStateType => {

    switch (action.type) {
        case 'SET-TASKS':
            const newTaskArr = action.tasks.map((el: ItemType) => {
                return ({id: el.id, title: el.title, isDone: el.status === 1})
            })
            return {...state, [action.todoListId]: newTaskArr}

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


//AC
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


export const setTasksAC = (todoListId: string, tasks: Array<ItemType>) => {
    return {
        type: 'SET-TASKS',
        todoListId,
        tasks
    } as const
}

//TC
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    taskApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC(todoListId, res.data.items))
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
        })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId, 'loading'))
    taskApi.addTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(addTaskAC(title, todoListId, res.data.data.item.id, false))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId, 'idle'))
        })
}

export const changeTaskTitleTC = (todoListId: string, taskId: string, title: string, taskStatus: boolean) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId, 'loading'))
    taskApi.editTaskTitleOrStatus(todoListId, taskId, title, taskStatus)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(changeTaskTitleAC(taskId, title, todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId, 'idle'))
        })
}

export const changeTaskStatusTC = (todoListId: string, taskId: string, title: string, taskStatus: boolean) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId, 'loading'))
    taskApi.editTaskTitleOrStatus(todoListId, taskId, title, taskStatus)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(changeTaskStatusAC(taskId, taskStatus, todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId, 'idle'))
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    dispatch(changeLoadingStatusAC(todoListId, 'loading'))
    taskApi.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(removeTaskAC(taskId, todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(changeLoadingStatusAC(todoListId, 'idle'))
        })
}