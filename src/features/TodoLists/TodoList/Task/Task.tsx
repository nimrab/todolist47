import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton, ListItem} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {RequestStatusType} from '../../../../store/app-reducer'
import {TaskType} from '../../../../app/App'
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from '../../../../store/tasks-reducer'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import css from './Task.module.css'

type TaskPropsType = {
    todoListId: string
    todoListLoadingStatus: RequestStatusType
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {

    const {todoListId, task} = props
    const dispatch = useDispatch()


    console.log(`Task ID: ${props.task.id} rendered`)

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleTC(todoListId, task.id, title, task.isDone))
    }, [dispatch])

    const changeTaskStatus = useCallback((isDone: boolean) => {
        dispatch(changeTaskStatusTC(todoListId, task.id, task.title, isDone))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskTC(todoListId, task.id))
    }, [dispatch])


    return (
        <ListItem
            className={task.isDone ? `${css.isDone}` : ''}
            disableGutters={true}
        >
            <Checkbox
                color={'primary'}
                checked={task.isDone}
                onChange={(event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(event.currentTarget.checked)}
                disabled={props.todoListLoadingStatus === 'loading'}
            />
            <EditableSpan
                title={task.title}
                changeTitle={changeTaskTitle}
            />
            <IconButton onClick={() => removeTask(task.id, todoListId)}
                        disabled={props.todoListLoadingStatus === 'loading'}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
})
