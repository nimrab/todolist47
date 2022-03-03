import React, {useCallback, useEffect} from 'react'
import {Button, ButtonGroup, IconButton, List, Typography} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useDispatch, useSelector} from "react-redux"
import {Task} from './Task/Task'
import {AppRootStateType} from '../../../store/store'
import {addTaskTC, getTasksTC} from '../../../store/tasks-reducer'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {TaskType} from '../../../app/App'
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    TodoListDomainType
} from '../../../store/todoLists-reducer'


export type TodolistPropsType = {
    todoList: TodoListDomainType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todoList}: TodolistPropsType) => {

    console.log(`Todolist ID: ${todoList.id} rendered`)
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTasksTC(todoList.id))
    }, [])


    let tasksForRender = tasks
    if (todoList.filter === 'active') {
        tasksForRender = tasks.filter(el => !el.isDone)
    }
    if (todoList.filter === 'completed') {
        tasksForRender = tasks.filter(el => el.isDone)
    }


    const setFilterAll = useCallback(() => {
        dispatch(changeTodoListFilterAC('all', todoList.id))
    }, [dispatch, todoList.id])

    const setFilterActive = useCallback(() => {
        dispatch(changeTodoListFilterAC('active', todoList.id))
    }, [dispatch, todoList.id])

    const setFilterCompleted = useCallback(() => {
        dispatch(changeTodoListFilterAC('completed', todoList.id))
    }, [dispatch, todoList.id])

    const removeTodolist = () => {
        dispatch(deleteTodoListTC(todoList.id))
    }

    const addTaskFn = useCallback((title: string) => {
        dispatch(addTaskTC(todoList.id, title))
    }, [dispatch, todoList.id])
    const changeTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(title, todoList.id))
    }, [dispatch, todoList.id])


    return (
        <div className='todolist'>
            <div>
                <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
                    <EditableSpan
                        title={todoList.title}
                        changeTitle={changeTitle}
                    />
                    <IconButton onClick={removeTodolist} disabled={todoList.loadingStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </Typography>
                <AddItemForm
                    addItem={addTaskFn}
                />
                <List>
                    {tasksForRender?.map(el => {
                        return (
                            <Task
                                key={el.id}
                                task={el}
                                todoListId={todoList.id}
                                todoListLoadingStatus={todoList.loadingStatus}
                            />)
                    })}
                </List>
                <div>
                    <ButtonGroup
                        variant={'contained'}
                        size={'small'}
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


