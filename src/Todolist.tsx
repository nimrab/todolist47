import React, {useCallback} from "react";
import {TaskType, TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";
import {Task} from "./Task";

export type TodolistPropsType = {
    todoList: TodolistType
}


const Todolist: React.FC<TodolistPropsType> = React.memo((props) => {
    console.log('Todolist rendered')
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoList.id])
    const dispatch = useDispatch()

    //будет все равно перерисовывать, если берем целый стейт!
    //надо в Task вызвать useSelector для конкретной Task
    //state => state.tasks[todoListid].filter(el=> el.id === taskID)[0]) .где TaskID приходит через пропсы


    let tasksForRender = tasks
    if (props.todoList.filter === "active") {
        tasksForRender = tasks.filter(el => !el.isDone)
    }
    if (props.todoList.filter === "completed") {
        tasksForRender = tasks.filter(el => el.isDone)
    }


    const setFilterAll = () => dispatch(ChangeTodoListFilterAC("all", props.todoList.id))
    const setFilterActive = () => dispatch(ChangeTodoListFilterAC("active", props.todoList.id))
    const setFilterCompleted = () => dispatch(ChangeTodoListFilterAC("completed", props.todoList.id))

    const removeTodolist = () => dispatch(RemoveTodoListAC(props.todoList.id))

    const addTaskFn = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todoList.id))
    }, [dispatch, props.todoList.id])

    const changeTitle = useCallback((title: string) => {
        dispatch(ChangeTodoListTitleAC(title, props.todoList.id))
    },[dispatch, props.todoList.id])


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

                    {tasksForRender.map(el => {
                        return (
                        <Task
                            key={el.id}
                            task={el}
                            todoListId={props.todoList.id}
                        />)
                    })}

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

})

export default Todolist;
