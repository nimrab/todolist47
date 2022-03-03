import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, taskReducer} from './tasks-reducer'
import {addTodoListAC, removeTodoListAC} from './todoLists-reducer'
import {v1} from 'uuid'
import {TaskStateType} from '../app/App'
import {ItemType} from "../api/task-api";


let startState: TaskStateType


beforeEach(() => {

   startState = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2');
    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false},
            { id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2', '4',false);
    const endState = taskReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].id).toBe('4')
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
});

test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC('2', 'task1', 'todolistId2');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('task1')
    expect(endState['todolistId1'][1].title).toBe('JS')
});

test('new array should be added when new todolist is added', () => {


    const action = addTodoListAC('new todolist', v1())

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC('todolistId2')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('task should be set from server data', () => {

    let dataFromServer:Array<ItemType> = [
        {
            id: "31ba9bf3-8833-427c-a8bc-69d0cb6629df",
            title: "put done",
            description: null,
            todoListId: "cb69e693-1b48-4bdc-8715-fa0122860d94",
            order: -1,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2022-02-10T18:39:14.043"
        },
        {
            id: "914f056b-2566-492e-acfa-7966115ee254",
            title: "post done",
            description: null,
            todoListId: "cb69e693-1b48-4bdc-8715-fa0122860d94",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2022-02-10T18:39:08.213"
        }
    ]

    const action = setTasksAC('todolistId2', dataFromServer)


    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].id).toBe("31ba9bf3-8833-427c-a8bc-69d0cb6629df")
})