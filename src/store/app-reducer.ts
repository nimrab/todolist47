import {Dispatch} from 'redux'
import {authApi} from '../api/auth-api'
import {statusCode} from './todoLists-reducer'
import {setIsLoggedInAC} from './auth-reducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ChangeAppStatusAT = ReturnType<typeof changeAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type setAppInitializeAT = ReturnType<typeof setAppInitializeAC>

export type AppActionsType =
    | ChangeAppStatusAT
    | SetAppErrorAT
    | setAppInitializeAT

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        case 'APP/SET-INITIALIZE':
            return {...state, isInitialized: action.value}

        default:
            return state
    }
}


//AC
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



//TC
export const appInitializeTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))

    authApi.me()
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(setIsLoggedInAC(true))
            }})
        .finally(() => {
            dispatch(setAppInitializeAC(true))
            dispatch(changeAppStatusAC('idle'))
        })
}

