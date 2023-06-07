import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../../features/taskReducer'
import {todolistsReducer} from '../../features/todolistsReducer'
import {AppRootStateType} from '../../app/store'
import {appReducer, ErrorType, RequestStatusType} from "../../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {
            id: 'todolistId1',
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: 'todolistId2',
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: ''
            },
            {
                id: v1(),
                title: 'JS',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: ''
            },
            {
                id: v1(),
                title: 'React Book',
                addedDate: '',
                completed: false,
                deadline: '',
                description: '',
                order: 0,
                priority: 0,
                startDate: '',
                status: 0,
                todoListId: ''
            }
        ]
    },
    app: {
        status: 'loading' as RequestStatusType,
        error: null as ErrorType
    }
}

export const storyBookStore = legacy_createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
)

export const StoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store = {storyBookStore}>{storyFn()}</Provider>
}
