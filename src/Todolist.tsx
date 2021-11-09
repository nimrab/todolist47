import React, {ChangeEvent, useState} from "react";
import {TaskType, FilterValuesType} from "./App";
import {KeyboardEvent} from "react";

export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolist_Id: string) => void
    addTask: (title: string, todolist_Id: string) => void
    changeFilter: (filter: FilterValuesType, todolist_Id: string) => void
    filter: string
    changeTaskStatus: (id: string, isDoneNewValue: boolean, todolist_Id: string) => void
    removeTodolist: (todolist_Id: string) => void

}

const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [title, setTitle] = useState<string>("") //local state

    const [error, setError] = useState<boolean>(false)


    const tasksJsxElements = props.tasks.map(el => {
        return (
            //лучше задать(склеить) id самому, тк по умолчанию он возьмет индексы массива(а элементы потом удаляем, индесы не последовательные)
            <li key={el.id} className={el.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, event.currentTarget.checked, props.id)}
                />
                <span>{el.title}</span>
                <button onClick={() => props.removeTask(el.id, props.id)}>x</button>
            </li>)
    });


    const setFilterAll = () => props.changeFilter("all", props.id)
    const setFilterActive = () => props.changeFilter("active", props.id)
    const setFilterCompleted = () => props.changeFilter("completed", props.id)
    const setActive = (value: string) => {
        return props.filter === value ? "active-filter" : ""
    }
    const changeTitleByButton = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const removeTodolist = () => props.removeTodolist(props.id)


    const addTaskFn = () => {

        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle, props.id) //не даем пустую строку
            setTitle("") //обнуляем поле ввода после энтера
        } else {
            setError(true)
        }
        setTitle("")
    }


    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null


    const changeTitleByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskFn()
        }
    } //import from react!


//UI:
    return (
        <div className="todolist">
            <div>
                <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
                <div>
                    <input
                        value={title} //будет раб и без присв в перем(полезно, когда обнов стр, а данные сохран)
                        placeholder='Enter new task'
                        onChange={changeTitleByButton}
                        onKeyPress={changeTitleByEnter}
                        className={error ? "error" : ""}
                    />
                    <button onClick={addTaskFn}>+</button>
                    {errorMessage}

                </div>
                <ul>

                    {tasksJsxElements}

                </ul>
                <div>
                    <button onClick={setFilterAll} className={setActive('all')}>All</button>
                    <button onClick={setFilterActive} className={setActive('active')}>Active</button>
                    <button onClick={setFilterCompleted} className={setActive('completed')}>Completed</button>
                </div>
            </div>
        </div>
    )

}

export default Todolist;
