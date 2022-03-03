import {applyMiddleware, combineReducers, createStore} from 'redux'
import {taskReducer} from './tasks-reducer'
import {todoListsReducer} from './todoLists-reducer'
import thunk from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from './auth-reducer'

const rootReducer = combineReducers(
    {
        tasks: taskReducer,
        todoLists: todoListsReducer,
        app: appReducer,
        auth: authReducer
    }
)


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store