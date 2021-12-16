import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodoListAC} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)


    const addTodolist = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    const todolistsComponents = todoLists.map(el => {


        return (

            <Grid item key={el.id}>
                <Paper elevation={5} style={{padding: '10px 10px 10px 10px'}}>
                    <Todolist
                        key={el.id}
                        id={el.id}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">

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
            </AppBar>


            <Container fixed={true} style={{marginTop: '75px'}}>

                <Grid container style={{padding: '29px 0'}}>
                    <div className={'add_todolist_input'}>
                        <AddItemForm addItem={addTodolist}/>
                    </div>

                </Grid>

                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>

        </div>
    )

}


export default App;
