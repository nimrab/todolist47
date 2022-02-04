import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import {useDispatch} from "react-redux";
import {taskApi} from "./api/task-api";

type TaskPropsType = {
    todoListId: string
    task: TaskType
}


export const Task = React.memo((props: TaskPropsType) => {

    const {todoListId, task} = props
    const dispatch = useDispatch()


    console.log(`Task ID: ${props.task.id} rendered`)

    const changeTaskTitle = (title: string) => {
        taskApi.editTaskTitleOrStatus(todoListId, task.id, title, task.isDone)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitleAC(task.id, title, todoListId))
                }
            })

    }

    const changeTaskStatus = (isDone: boolean) => {
        taskApi.editTaskTitleOrStatus(todoListId, task.id, task.title, isDone)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(task.id, isDone, todoListId))
                }
            })
    }

    const removeTask = (taskId: string, todoListId: string) => {

        taskApi.deleteTask(todoListId, task.id)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(task.id, todoListId))
                }
            })
    }


    // const changeTitle_Map = useCallback((title: string) => {
    //     dispatch(changeTaskTitleAC(task.id, title, todoListId))
    // }, [dispatch, task.id, todoListId])

    return (
        <ListItem
            className={task.isDone ? "is-done" : ""}
            disableGutters={true}
        >

            <Checkbox
                color={'primary'}
                checked={task.isDone}
                onChange={(event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(event.currentTarget.checked)}
            />


            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitle}
            />


            <IconButton onClick={() => removeTask(task.id, todoListId)}>
                <Delete fontSize={'small'}/>
            </IconButton>


        </ListItem>
    );
})
