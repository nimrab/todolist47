import React, {useCallback, useEffect} from 'react'
import './App.css'
import Todolist from './Todolist'
import {AddItemForm} from './AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {addTodoListTC, getTodoListTC, TodolistDomainType} from './store/todolists-reducer'
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from './store/store'
import {ErrorSnackbar} from './ErrorSnackbar/ErrorSnackbar'
import {initializeAppTC, RequestStatusType, setAppInitializeAC} from "./store/app-reducer"
import {LinearProgress} from '@mui/material'
import {Routes, Route, Navigate} from "react-router-dom"
import {Page404} from './common/Page404'
import {Login} from "./features/Login/Login";
import { Link } from 'react-router-dom'
import TodoLists from "./todolists/TodoLists";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const initialize = useSelector<AppRootStateType, boolean>(state => state.app.initialize)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoListTC())
        }
    }, [isLoggedIn])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])


    if (!initialize) {
        return <div>loaidng</div>
    }

    return (

        <div className="App">

            <ErrorSnackbar/>

            <AppBar position="fixed">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    {/*<Button color="inherit" variant={"outlined"}>Login</Button>*/}
                  {/*  {status === 'idle ? null: <Link to=\'/login\'>Lgin</Link>}*/}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>


            <Container fixed={true} style={{marginTop: '75px'}}>
                <Routes>
                    <Route path='/' element={<Grid container style={{padding: '29px 0'}}>
                        <div className={'add_todolist_input'}>
                            <AddItemForm addItem={addTodolist} status={status}/>
                        </div>
                    </Grid>}/>
                </Routes>

                <Grid container spacing={4}>
                    <Routes>
                        <Route path='/' element={<TodoLists todoLists={todoLists} isLoggedIn={isLoggedIn} />}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='/404' element={<Page404/>}/>
                        <Route path='*' element={<Navigate to='/404'/>}/>
                    </Routes>
                </Grid>
            </Container>
        </div>
    )
}


export default App;
