import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "./store/tasks-reducer";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import {useDispatch} from "react-redux";
import {RequestStatusType} from "./store/app-reducer";

type TaskPropsType = {
    todoListId: string
    todoListLoadingStatus: RequestStatusType
    task: TaskType
}


export const Task = React.memo((props: TaskPropsType) => {

    const {todoListId, task} = props
    const dispatch = useDispatch()


    console.log(`Task ID: ${props.task.id} rendered`)

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleTC(todoListId, task.id, title, task.isDone))
    }
    const changeTaskStatus = (isDone: boolean) => {
        dispatch(changeTaskStatusTC(todoListId, task.id, task.title, isDone))
    }
    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, task.id))
    }


    return (
        <ListItem
            className={task.isDone ? "is-done" : ""}
            disableGutters={true}
        >

            <Checkbox
                color={'primary'}
                checked={task.isDone}
                onChange={(event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(event.currentTarget.checked)}
                disabled={props.todoListLoadingStatus==='loading'}
            />



            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitle}
            />

            <IconButton onClick={() => removeTask(task.id, todoListId)} disabled={props.todoListLoadingStatus==='loading'}>
                <Delete fontSize={'small'}/>
            </IconButton>


        </ListItem>
    )
})
