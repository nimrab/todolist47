import React, {useCallback, useEffect} from "react";
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
import {todolistApi} from "./api/todolist-api";
import {taskApi} from "./api/task-api";

export type TodolistPropsType = {
    todoList: TodolistType
}


const Todolist: React.FC<TodolistPropsType> = React.memo(({todoList}: TodolistPropsType) => {


    console.log(`Todolist ID: ${todoList.id} rendered`)
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()

    //будет все равно перерисовывать, если берем целый стейт!
    //надо в Task вызвать useSelector для конкретной Task
    //state => state.tasks[todoListid].filter(el=> el.id === taskID)[0]) .где TaskID приходит через пропсы

    useEffect(() => {

        taskApi.getTasks(todoList.id)
            .then(res => {
                if (res.data.error === null) {
                    res.data.items.forEach(el => {
                        dispatch(addTaskAC(el.title, todoList.id, el.id, el.completed))
                    })
                }
            })

    },[])


    let tasksForRender = tasks
    if (todoList.filter === "active") {
        tasksForRender = tasks.filter(el => !el.isDone)
    }
    if (todoList.filter === "completed") {
        tasksForRender = tasks.filter(el => el.isDone)
    }


    const setFilterAll = useCallback(() => {
        dispatch(ChangeTodoListFilterAC("all", todoList.id))
    }, [dispatch, todoList.id])

    const setFilterActive = useCallback(() => {
        dispatch(ChangeTodoListFilterAC("active", todoList.id))
    }, [dispatch, todoList.id])

    const setFilterCompleted = useCallback(() => {
        dispatch(ChangeTodoListFilterAC("completed", todoList.id))
    }, [dispatch, todoList.id])

    const removeTodolist = () => {
        todolistApi.deleteTodo(todoList.id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodoListAC(todoList.id))
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    const addTaskFn = useCallback((title: string) => {

        taskApi.addTask(todoList.id, title)
            .then(res=> {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(title, todoList.id, res.data.data.item.id, false))
                }
            })


    }, [dispatch, todoList.id])
    const changeTitle = useCallback((title: string) => {
        todolistApi.editTodo(title, todoList.id)
            .then(res=> {
                if (res.data.resultCode === 0) {
                    dispatch(ChangeTodoListTitleAC(title, todoList.id))
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, [dispatch, todoList.id])



    return (
        <div className="todolist">
            <div>
                <Typography variant={"h6"} style={{fontWeight: 'bold'}}>
                    <EditableSpan
                        title={todoList.title}
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
                                todoListId={todoList.id}
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
                                color={todoList.filter === 'all' ? 'secondary' : 'primary'}>All</Button>
                        <Button onClick={setFilterActive}
                                color={todoList.filter === 'active' ? 'secondary' : 'primary'}>Active</Button>
                        <Button onClick={setFilterCompleted}
                                color={todoList.filter === 'completed' ? 'secondary' : 'primary'}>Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )

})

export default Todolist;
