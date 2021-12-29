import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    todoListId: string
    task: TaskType
}


export const Task = React.memo((props: TaskPropsType) => {

    const {todoListId, task} = props
    const dispatch = useDispatch()


    console.log(`Task ID: ${props.task.id} rendered`)

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todoListId))
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, todoListId))}
            />


            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitle}
            />


            <IconButton onClick={() => dispatch(removeTaskAC(task.id, todoListId))}>
                <Delete fontSize={'small'}/>
            </IconButton>


        </ListItem>
    );
})
