import {TaskStateType, TodolistType} from "../App";
import {AddTodoListAC, todolistsReducer} from "./todolists-reducer";
import {taskReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
})
