import React, {ChangeEvent, useState} from "react";
import {TaskType, FilterValuesType, TodolistType, TaskStateType} from "./App";
import {KeyboardEvent} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, Icon, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolist_Id: string) => void
    addTask: (title: string, todolist_Id: string) => void
    changeFilter: (filter: FilterValuesType, todolist_Id: string) => void
    filter: string
    changeTaskStatus: (id: string, isDoneNewValue: boolean, todolist_Id: string) => void
    removeTodolist: (todolist_Id: string) => void
    changeTaskTitle: (id: string, title: string, todolist_Id: string) => void
    changeTodolistTitle: (title: string, todolist_Id: string) => void

}

const Todolist: React.FC<TodolistPropsType> = (props) => {

    const todoList = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists.filter(el => el.id === props.id))
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks[props.id])

    //+перенести все методы из App

    const tasksJsxElements = props.tasks.map(el => {

        const changeTitle_Map = (title: string) => {
            props.changeTaskTitle(el.id, title, props.id)
        }

        return (
            //лучше задать(склеить) id самому, тк по умолчанию он возьмет индексы массива(а элементы потом удаляем, индесы не последовательные)
            <ListItem
                key={el.id}
                className={el.isDone ? "is-done" : ""}
                disableGutters={true}
            >
                <Checkbox
                    color={'primary'}
                    checked={el.isDone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, event.currentTarget.checked, props.id)}
                />


                <EditableSpan
                    title={el.title}
                    changeTitle={changeTitle_Map}
                />


                <ButtonGroup onClick={() => props.removeTask(el.id, props.id)}>
                    <Delete fontSize={'small'}></Delete>
                </ButtonGroup>
            </ListItem>)
    });


    const setFilterAll = () => props.changeFilter("all", props.id)
    const setFilterActive = () => props.changeFilter("active", props.id)
    const setFilterCompleted = () => props.changeFilter("completed", props.id)
    const setActive = (value: string) => {
        return props.filter === value ? "active-filter" : ""
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const addTaskFn = (title: string) => {
        props.addTask(title, props.id) //не даем пустую строку
    }
    const changeTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)

    }


//UI:
    return (
        <div className="todolist">
            <div>
                <Typography variant={"h6"} style={{fontWeight: 'bold'}}>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTitle}
                    />

                    <IconButton onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </Typography>


                <AddItemForm
                    addItem={addTaskFn}

                />

                <List>

                    {tasksJsxElements}

                </List>
                <div>
                    <ButtonGroup
                        variant={"contained"}
                        size={"small"}
                        // disableElevation={true}
                    >
                        <Button onClick={setFilterAll}
                                color={props.filter === 'all' ? 'secondary' : 'primary'}>All</Button>
                        <Button onClick={setFilterActive}
                                color={props.filter === 'active' ? 'secondary' : 'primary'}>Active</Button>
                        <Button onClick={setFilterCompleted}
                                color={props.filter === 'completed' ? 'secondary' : 'primary'}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )

}

export default Todolist;
