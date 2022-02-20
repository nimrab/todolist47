export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppActionsType =
    | ChangeStatusACType
    | SetAppErrorACType



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}


export type ChangeStatusACType = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}


export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>


export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

