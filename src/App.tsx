import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    let [task, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: false},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Vue", isDone: true},
            {id: 5, title: "Graph", isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>("all")

    //BLL:
    // let task: Array<TaskType> = [ //или TaskType []
    //     {id: 1, title: "HTML", isDone: true},
    //     {id: 2, title: "CSS", isDone: false},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Vue", isDone: false},
    //     {id: 5, title: "Graph", isDone: false},
    // ]

    const removeTask = (taskID: number) => {
        //task = task.filter(el => el.id !== taskID)
        //console.log(task)
        setTasks(task.filter(el => el.id !== taskID))
        console.log(task)
    }

    const changeFilter = (filter: FilterValuesType) => {

        setFilter(filter)

    }

    let tasksForRender = task

    if(filter === "active") {
        tasksForRender = task.filter(el => el.isDone === false)
    }

    if(filter === "completed") {
        tasksForRender = task.filter(el => el.isDone === true)
    }


    return (
        <div className="App">

            <Todolist
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<Todolist title={"What to learn"} tasks={task} removeTask={removeTask}/>*/}
            {/*Передаем уже обновляемый массив из State, а не изначальный статичный массив*/}
            {/*<Todolist title={"What to buy"} tasks={task} removeTask={removeTask}/>*/}
            {/*<Todolist title={"What to read"} tasks={task} removeTask={removeTask}/>*/}

        </div>
    );
}


export default App;
