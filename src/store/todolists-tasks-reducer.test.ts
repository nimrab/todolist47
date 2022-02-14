import {TaskStateType, TodolistType} from "../App";
import {addTodoListAC, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./tasks-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodoListAC("new todolist", v1());

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
})
