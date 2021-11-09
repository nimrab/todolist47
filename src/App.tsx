import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"


function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
            {id: todolistId_1, title: 'what to learn', filter: 'all'},
            {id: todolistId_2, title: 'what to eat', filter: 'all'},
        ]
    )

    const [task, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: true},
            {id: v1(), title: "Graph", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Pasta", isDone: true},
            {id: v1(), title: "Coca-Cola", isDone: false},
            {id: v1(), title: "Whiskey", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ],

    })

    //Business Logic Level (BLL)
    // let [task, setTasks] = useState<Array<TaskType>>(
    //     [
    //         {id: v1(), title: "HTML", isDone: true},
    //         {id: v1(), title: "CSS", isDone: false},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Vue", isDone: true},
    //         {id: v1(), title: "Graph", isDone: false},
    //     ]
    // )


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string, todolist_Id: string) => {
       const filter = task[todolist_Id].filter(el => el.id !== taskID)
        task[todolist_Id] = filter
        setTasks({...task})
    }
    const addTask = (title: string, todolist_Id: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...task,
            [todolist_Id]: [newTask, ...task[todolist_Id]]
        })

    }
    const changeTaskStatus = (id: string, isDoneNewValue: boolean, todolist_Id: string) => {
        const updatedTasks = task[todolist_Id].map(el => {
            if (el.id === id) {
                return {...el, isDone: isDoneNewValue}
            }
            return el
        })
        setTasks({...task, [todolist_Id]:[...updatedTasks] })
    }
    const changeFilter = (filter: FilterValuesType, todolist_Id: string) => {

        setTodoLists(todoLists.map(el => el.id === todolist_Id ? {...el, filter} : el ))

    }
    const removeTodolist = (todolist_Id: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todolist_Id))
        delete task[todolist_Id]
    }

    const todolistsComponents = todoLists.map(el => {


        let tasksForRender = task[el.id]

        if (el.filter === "active") {
            tasksForRender = task[el.id].filter(el => !el.isDone)
        }
        if (el.filter === "completed") {
            tasksForRender = task[el.id].filter(el => el.isDone)
        }

        return (
            <Todolist
                key={el.id}
                id={el.id}
                filter={el.filter}
                title={el.title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })




    return (
        <div className="App">

            {todolistsComponents}

        </div>
    );
}


export default App;
