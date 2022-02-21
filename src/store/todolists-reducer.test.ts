import {
    addTodoListAC, changeLoadingStatusAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../App';


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", loadingStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", loadingStatus:"idle"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";
    let newTodolistId = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", loadingStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", loadingStatus:"idle"}
    ]

    const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle, newTodolistId))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistsReducer(startState, changeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



test('loading status of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeLoadingStatusAC(todolistId1, 'loading'));

    expect(endState[0].loadingStatus).toBe('loading');
    expect(endState[1].loadingStatus).toBe('idle');
})