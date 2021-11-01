import React, {ChangeEvent, useState} from "react";
import {TaskType, FilterValuesType} from "./App";
import {KeyboardEvent} from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    filter: string
    changeTaskStatus: (id: string, isDoneNewValue: boolean) => void

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
                    onChange={(event:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, event.currentTarget.checked)}
                />
                <span>{el.title}</span>
                <button onClick={() => props.removeTask(el.id)}>x</button>
            </li>)
    });


    const setFilterAll = () => props.changeFilter("all")
    const setFilterActive = () => props.changeFilter("active")
    const setFilterCompleted = () => props.changeFilter("completed")
    const setActive = (value: string) => {
        return props.filter === value ? "active-filter" : ""
    }
    const changeTitleByButton = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)



    }


    const addTaskFn = () => {

        const trimTitle = title.trim()
        if(trimTitle) {
            props.addTask(trimTitle) //не даем пустую строку
            setTitle("") //обнуляем поле ввода после энтера
        } else {
            setError(true)
        }
        setTitle("")
    }


    const changeTitleByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskFn()
        }
    } //import from react!


//UI:
    return (
        <div className="todolist">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title} //будет раб и без присв в перем(полезно, когда обнов стр, а данные сохран)
                        placeholder='Enter new task'
                        onChange={changeTitleByButton}
                        onKeyPress={changeTitleByEnter}
                        className={error ? "error" : ""}
                    />

                    <button onClick={addTaskFn}>+</button>

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
