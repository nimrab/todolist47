import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers(
    {
        tasks: taskReducer,
        todoLists: todolistsReducer,
    }
)


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store