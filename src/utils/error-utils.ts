import {Dispatch} from "redux";
import {AppActionsType, changeAppStatusAC, setAppErrorAC} from "../store/app-reducer";
import {ResponseType} from '../api/todoList-api'
import {AuthActionsType} from "../store/auth-reducer";
import {TasksActionType} from "../store/tasks-reducer";
import {TodoListsActionType} from "../store/todoLists-reducer";


type HandleErrorType =
    | AppActionsType
    | AuthActionsType
    | TasksActionType
    | TodoListsActionType

export const handleServerNetworkError = (dispatch: Dispatch<HandleErrorType>, message: string) => {
    dispatch(setAppErrorAC(message))
}


export const handleServerAppError = <T>(dispatch: Dispatch<HandleErrorType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}
