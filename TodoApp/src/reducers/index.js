import { combineReducers } from 'redux'
import TaskListReducer from './taskListReducer'

export const rootReducer = combineReducers({
    taskListReducer: TaskListReducer
});