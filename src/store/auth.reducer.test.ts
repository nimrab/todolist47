import {authReducer, InitialStateType, setIsLoggedInAC} from "./auth-reducer";

let startState: InitialStateType


beforeEach(() => {

    startState = {
        isLoggedIn: false
    }
})


test('isLoggedIn value should be changed', () => {

    const action = setIsLoggedInAC(true)
    const endState = authReducer(startState, setIsLoggedInAC(true))

    expect(endState.isLoggedIn).toBe(true)

})
