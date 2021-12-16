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
    todoList: TodolistType
}


const Todolist: React.FC<TodolistPropsType> = (props) => {

    //const todoList = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists.filter(el => el.id === props.id))
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id])
    const dispatch = useDispatch()


    let tasksForRender = tasks
    if (props.todoList.filter === "active") {
        tasksForRender = tasks.filter(el => !el.isDone)
    }
    if (props.todoList.filter === "completed") {
        tasksForRender = tasks.filter(el => el.isDone)
    }


    const tasksJsxElements = tasksForRender.map(el => {

        const changeTitle_Map = (title: string) => {
            dispatch(changeTaskTitleAC(el.id, title, props.todoList.id))
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
                    onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(el.id, event.currentTarget.checked, props.todoList.id))}
                />


                <EditableSpan
                    title={el.title}
                    changeTitle={changeTitle_Map}
                />


                <IconButton onClick={() => dispatch(removeTaskAC(el.id, props.todoList.id))}>
                        <Delete fontSize={'small'}/>
                </IconButton>


            </ListItem>)
    });


    const setFilterAll = () => dispatch(ChangeTodoListFilterAC("all", props.todoList.id))
    const setFilterActive = () => dispatch(ChangeTodoListFilterAC("active", props.todoList.id))
    const setFilterCompleted = () => dispatch(ChangeTodoListFilterAC("completed", props.todoList.id))

    const removeTodolist = () => dispatch(RemoveTodoListAC(props.todoList.id))
    const addTaskFn = (title: string) => {
        dispatch(addTaskAC(title, props.todoList.id))
    }
    const changeTitle = (title: string) => {
        dispatch(ChangeTodoListTitleAC(title, props.todoList.id))
    }


//UI:
    return (
        <div className="todolist">
            <div>
                <Typography variant={"h6"} style={{fontWeight: 'bold'}}>
                    <EditableSpan
                        title={props.todoList.title}
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
                                color={props.todoList.filter === 'all' ? 'secondary' : 'primary'}>All</Button>
                        <Button onClick={setFilterActive}
                                color={props.todoList.filter === 'active' ? 'secondary' : 'primary'}>Active</Button>
                        <Button onClick={setFilterCompleted}
                                color={props.todoList.filter === 'completed' ? 'secondary' : 'primary'}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )

}

export default Todolist;
