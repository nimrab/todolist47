import {appReducer, changeAppStatusAC, RequestStatusType, setAppErrorAC, setAppInitializeAC} from "./app-reducer";
import {InitialStateType} from "./app-reducer";


let startState: InitialStateType


beforeEach(() => {

    startState = {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    }
})


test('App status should be changed to "loading"', () => {

    const action = changeAppStatusAC('loading')
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('loading')
})


test('App error should be set to "Some Error"', () => {

    const action = setAppErrorAC('Some Error')
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('Some Error')
})

test('App isInitialized should be changed to opposite', () => {

    const action = setAppInitializeAC(true)
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true)
})

