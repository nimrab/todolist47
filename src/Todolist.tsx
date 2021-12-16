import React, {ChangeEvent} from "react";
import {TaskType, TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

export type TodolistPropsType = {
    id: string
}


const Todolist: React.FC<TodolistPropsType> = (props) => {

    const todoList = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists.filter(el => el.id === props.id))
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    let tasksForRender = tasks
    if (todoList[0].filter === "active") {
        tasksForRender = tasks.filter(el => !el.isDone)
    }
    if (todoList[0].filter === "completed") {
        tasksForRender = tasks.filter(el => el.isDone)
    }


    const tasksJsxElements = tasksForRender.map(el => {

        const changeTitle_Map = (title: string) => {
            dispatch(changeTaskTitleAC(el.id, title, props.id))
        }

        return (
            <ListItem
                key={el.id}
                className={el.isDone ? "is-done" : ""}
                disableGutters={true}
            >
                <Checkbox
                    color={'primary'}
                    checked={el.isDone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(el.id, event.currentTarget.checked, props.id))}
                />


                <EditableSpan
                    title={el.title}
                    changeTitle={changeTitle_Map}
                />


                <ButtonGroup onClick={() => dispatch(removeTaskAC(el.id, props.id))}>
                    <Delete fontSize={'small'}></Delete>
                </ButtonGroup>
            </ListItem>)
    });


    const setFilterAll = () => dispatch(ChangeTodoListFilterAC("all", props.id))
    const setFilterActive = () => dispatch(ChangeTodoListFilterAC("active", props.id))
    const setFilterCompleted = () => dispatch(ChangeTodoListFilterAC("completed", props.id))

    const removeTodolist = () => dispatch(RemoveTodoListAC(props.id))
    const addTaskFn = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }
    const changeTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAC(title, props.id))
    }


//UI:
    return (
        <div className="todolist">
            <div>
                <Typography variant={"h6"} style={{fontWeight: 'bold'}}>
                    <EditableSpan
                        title={todoList[0].title}
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
                        disableElevation={true}
                    >
                        <Button onClick={setFilterAll}
                                color={todoList[0].filter === 'all' ? 'secondary' : 'primary'}>All</Button>
                        <Button onClick={setFilterActive}
                                color={todoList[0].filter === 'active' ? 'secondary' : 'primary'}>Active</Button>
                        <Button onClick={setFilterCompleted}
                                color={todoList[0].filter === 'completed' ? 'secondary' : 'primary'}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )

}

export default Todolist;
