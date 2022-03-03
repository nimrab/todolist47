import {
    addTodoListAC,
    changeLoadingStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListsAC,
    TodoListDomainType,
    todoListsReducer
} from './todoLists-reducer'
import {v1} from 'uuid'
import {FilterValuesType} from '../app/App'
import {TodoType} from '../api/todoList-api'


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType>


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', loadingStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', loadingStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {


    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v1()

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', loadingStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', loadingStatus: 'idle'}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle, newTodolistId))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todoListsReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})


test('loading status of todolist should be changed', () => {
    const endState = todoListsReducer(startState, changeLoadingStatusAC(todolistId1, 'loading'));

    expect(endState[0].loadingStatus).toBe('loading')
    expect(endState[1].loadingStatus).toBe('idle')
})

test('todoLists should be set from server data', () => {

    let dataFromServer: TodoType[] = [
        {
            id: 'a2670c29-851f-4f67-a080-acb18d1c3c37',
            title: "newTest",
            addedDate: "2022-03-03T15:32:07.583",
            order: -3
        },
        {
            id: 'da748936-118d-4344-ad16-661f014bb2de',
            title: "some new todolist",
            addedDate: "2022-03-02T09:08:41.287",
            order: -2
        }
    ]

    const action = setTodoListsAC(dataFromServer)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe('a2670c29-851f-4f67-a080-acb18d1c3c37')
    expect(endState[1].title).toBe('some new todolist')
})