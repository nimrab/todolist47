import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./store/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {stat} from "fs";


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
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const removeTask = (taskID: string, todolist_Id: string) => {
        dispatch(removeTaskAC(taskID, todolist_Id))
    }
    const addTask = (title: string, todolist_Id: string) => {
        dispatch(addTaskAC(title, todolist_Id))
    }
    const changeTaskStatus = (id: string, isDoneNewValue: boolean, todolist_Id: string) => {
        dispatch(changeTaskStatusAC(id, isDoneNewValue, todolist_Id))
    }
    const changeFilter = (filter: FilterValuesType, todolist_Id: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todolist_Id))
    }
    const removeTodolist = (todolist_Id: string) => {
        const action = RemoveTodoListAC(todolist_Id)
        dispatch(action)
    }
    const addTodolist = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)

    }
    const changeTodolistTitle = (title: string, todolist_Id: string) => {
        dispatch(ChangeTodoListTitleAC(title, todolist_Id))
    }
    const changeTaskTitle = (id: string, title: string, todolist_Id: string) => {
        dispatch(changeTaskTitleAC(id, title, todolist_Id))
    }


    const todolistsComponents = todoLists.map(el => {

        let tasksForRender = tasks[el.id]

        if (el.filter === "active") {
            tasksForRender = tasks[el.id].filter(el => !el.isDone)
        }
        if (el.filter === "completed") {
            tasksForRender = tasks[el.id].filter(el => el.isDone)
        }


        return (

            <Grid item key={el.id}>
                <Paper elevation={5} style={{padding: '10px 10px 10px 10px'}}>
                    <Todolist
                        id={el.id}
                        filter={el.filter}
                        title={el.title}
                        tasks={tasksForRender}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
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
