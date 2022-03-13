import React, {useCallback, useEffect} from 'react'
import {AppBar, Button, Container, Grid, Toolbar, Typography} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../store/store'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {appInitializeTC, RequestStatusType} from '../store/app-reducer'
import {LinearProgress} from '@mui/material'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Page404} from '../components/Page404/Page404'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../store/auth-reducer'
import {TodoLists} from '../features/TodoLists/TodoLists'


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
export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(appInitializeTC())
    }, [])


    const authLogout = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])


    if (!isInitialized) {
        return <LinearProgress/>
    }

    return (
        <div className='App'>
            <ErrorSnackbar/>
            <AppBar position='fixed'>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    {/* <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>*/}
                    <Typography variant='h6' align={'center'}>
                        Todolists
                    </Typography>
                    {isLoggedIn && <Button
                        color='inherit'
                        variant={'outlined'}
                        onClick={authLogout}
                    >
                        Logout
                    </Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed={true} style={{marginTop: '75px'}}>
                <Grid container spacing={4}>
                    <Routes>
                        <Route path='/' element={<TodoLists/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/404' element={<Page404/>}/>
                        {/*<Route path='/*' element={<Navigate to='/404'/>}/>*/}
                    </Routes>
                </Grid>
            </Container>
        </div>
    )
}


