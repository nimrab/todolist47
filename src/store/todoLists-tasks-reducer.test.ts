import {addTodoListAC, TodoListDomainType, todoListsReducer} from './todoLists-reducer'
import {taskReducer} from './tasks-reducer'
import {v1} from 'uuid'
import {TaskStateType} from '../app/App'

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC('new todolist', v1());

    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);
})
