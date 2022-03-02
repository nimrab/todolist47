import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {statusCode} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | ChangeAppStatusAT
    | SetAppErrorAT
    | setAppInitializeAT


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    initialize: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        case 'APP/SET-INITIALIZE':
            return {...state, initialize: action.value}

        default:
            return state
    }
}


export type ChangeAppStatusAT = ReturnType<typeof changeAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type setAppInitializeAT = ReturnType<typeof setAppInitializeAC>

export const changeAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}


export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setAppInitializeAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZE',
        value
    } as const
}

//thunks


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))

    authApi.me()
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
            dispatch(setAppInitializeAC(true))
        })

}

