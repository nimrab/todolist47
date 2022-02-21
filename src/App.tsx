import React, {useCallback, useEffect} from 'react';
import './App.css'
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListTC, getTodoListTC, TodolistDomainType} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./store/app-reducer";
import {LinearProgress} from '@mui/material';


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

    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    const todoListsComponents = todoLists.map(el => {
        return (
            <Grid item key={el.id}>
                <Paper elevation={5} style={{padding: '10px 10px 10px 10px'}}>
                    <Todolist
                        todoList={el}
                    />
                </Paper>
            </Grid>
        )
    })


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
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>



            <Container fixed={true} style={{marginTop: '75px'}}>
                <Grid container style={{padding: '29px 0'}}>
                    <div className={'add_todolist_input'}>
                        <AddItemForm addItem={addTodolist} status={status}/>
                    </div>

                </Grid>

                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )

}


export default App;
