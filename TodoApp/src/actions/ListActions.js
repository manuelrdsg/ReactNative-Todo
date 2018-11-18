import { LIST_ADD_TASK, LIST_REMOVE_TASK, LIST_GET_TASKS, LIST_LOAD_TASKS, LIST_CHANGE_TEXT } from './ActionConstants'

export const changeText = (params) => {
    return {
        type: LIST_CHANGE_TEXT,
        params: params
    }
}

export const addTask = (params) => {
    return {
        type: LIST_ADD_TASK,
        params: params
    }
}

export const removeTask = (params) => {
    return {
        type: LIST_REMOVE_TASK,
        params: params
    }
}

export const getTasks = () => {
    return {
        type: LIST_GET_TASKS
    }
}

export const loadTasks = (params) => {
    return {
        type: LIST_LOAD_TASKS,
        params: params
    }
}