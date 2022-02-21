import {Dispatch} from "redux";
import {AppActionsType, changeStatusAC, setAppErrorAC} from "../store/app-reducer";
import {ResponseType} from '../api/todolist-api'


export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
}


export const handleServerAppError = <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}
