import React, {ChangeEvent, useState} from "react";
import {TaskType, FilterValuesType} from "./App";
import {KeyboardEvent} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";

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
    changeTaskTitle: (id: string, title: string, todolist_Id: string) => void
    changeTodolistTitle: (title:string, todolist_Id: string) => void

}

const Todolist: React.FC<TodolistPropsType> = (props) => {


    const tasksJsxElements = props.tasks.map(el => {

        const changeTitle_Map = (title:string) => {
            props.changeTaskTitle(el.id, title, props.id)
        }

        return (
            //лучше задать(склеить) id самому, тк по умолчанию он возьмет индексы массива(а элементы потом удаляем, индесы не последовательные)
            <li key={el.id} className={el.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, event.currentTarget.checked, props.id)}
                />

                <EditableSpan
                    title={el.title}
                    changeTitle={changeTitle_Map}
                />

                <button onClick={() => props.removeTask(el.id, props.id)}>x</button>
            </li>)
    });


    const setFilterAll = () => props.changeFilter("all", props.id)
    const setFilterActive = () => props.changeFilter("active", props.id)
    const setFilterCompleted = () => props.changeFilter("completed", props.id)
    const setActive = (value: string) => {
        return props.filter === value ? "active-filter" : ""
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    const addTaskFn = (title: string) => {
        props.addTask(title, props.id) //не даем пустую строку
    }
    const changeTitle = (title:string) => {
        props.changeTodolistTitle(title, props.id)
    }



//UI:
    return (
        <div className="todolist">
            <div>
                <h3>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTitle}
                    />

                    <button onClick={removeTodolist}>X</button>
                </h3>


                <AddItemForm
                    addItem={addTaskFn}

                />

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
