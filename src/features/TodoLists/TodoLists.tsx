import React, {useCallback, useEffect} from 'react'
import {Grid, Paper} from '@material-ui/core'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {addTodoListTC, getTodoListTC, TodoListDomainType} from '../../store/todoLists-reducer'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './TodoList/Todolist'



export const TodoLists = () => {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoListTC())
        }
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])


    if (!isLoggedIn) {
        return (
            <Navigate to='/login'/>
        )
    }

    return (
        <>
            <Grid container style={{margin: '30px 0 18px 20px'}}>
                <div className={'add_todolist_input'}>
                    <AddItemForm addItem={addTodolist}/>
                </div>
            </Grid>
            {todoLists.map((el: TodoListDomainType) => {
                return (
                    <Grid item key={el.id}>
                        <Paper elevation={5} style={{padding: '10px 10px 10px 10px'}}>
                            <Todolist
                                todoList={el}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}

