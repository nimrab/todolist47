import React from "react";
import {TaskType, FilterValuesType} from "./App";



type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void

}

const Todolist:React.FC<TodolistPropsType> = (props) => {

    const tasksJSXelements = props.tasks.map(el => {
        return (
            //лучше задать(склеить) id самому, тк по умолчанию он возьмет индексы массива(а элементы потом удаляем, индесы не последовательные)
        <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => props.removeTask(el.id)}>x</button>
        </li>)
    });

//UI:
return (
    <div className="todolist">
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}


                {tasksJSXelements}

            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    </div>
)

}

export default Todolist;
