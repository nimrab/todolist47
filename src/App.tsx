import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {

    //Business Logic Level (BLL)
    let [task, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
            {id: v1(), title: "Graph", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all")


    const removeTask = (taskID: string) => {
        //task = task.filter(el => el.id !== taskID)
        //console.log(task)
        setTasks(task.filter(el => el.id !== taskID))
        console.log(task)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks([newTask, ...task])

    }

    const changeTaskStatus = (id: string, isDoneNewValue:boolean) => {
        const updatedTasks = task.map(el => {
            if (el.id === id) {
                return {...el, isDone: isDoneNewValue}
            }
            return el
        })
        setTasks(updatedTasks)
    }


    const changeFilter = (filter: FilterValuesType) => {

        setFilter(filter)

    }

    let tasksForRender = task

    if (filter === "active") {
        tasksForRender = task.filter(el => !el.isDone)
    }

    if (filter === "completed") {
        tasksForRender = task.filter(el => el.isDone)
    }


    return (
        <div className="App">

            <Todolist
                filter={filter}
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}


export default App;
