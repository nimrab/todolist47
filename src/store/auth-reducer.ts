import {Dispatch} from 'redux'
import {changeAppStatusAC, ChangeAppStatusAT} from './app-reducer'
import {authApi, LoginParamsType} from '../api/auth-api'
import {statusCode} from './todoLists-reducer'
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils'


const initialState = {
    isLoggedIn: false
}

export type InitialStateType = typeof initialState
type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
export type AuthActionsType =
    setIsLoggedInAT |
    ChangeAppStatusAT


export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

//AC
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'LOGIN/SET-IS-LOGGED-IN',
        value
    } as const
}


// TC
export const loginTC = (formData: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    authApi.login(formData)
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
        })

}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === statusCode.success) {
                dispatch(setIsLoggedInAC(false))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(changeAppStatusAC('idle'))
        })
}

