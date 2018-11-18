import { LIST_ADD_TASK, LIST_REMOVE_TASK, LIST_GET_TASKS, LIST_LOAD_TASKS, LIST_CHANGE_TEXT } from '../actions/ActionConstants'
import { LIST_SIZE_SMALL, LIST_SIZE_MEDIUM, LIST_SIZE_BIG } from '../constants/LIST_SIZE'

const initialState = {
    tasks: [],
    text: "",
    refreshing: false
}

const TaskListReducer = (state = initialState, action) => {
    console.log("Reducer: ")
    console.log(action)
    console.log("-----------")
    switch(action.type) {
        case LIST_CHANGE_TEXT: 
            return {
                ...state,
                text: action.params.text
        }
        case LIST_ADD_TASK:
            return {
                ...state, 
                tasks: [...state.tasks, {key: String(Math.random()), text:action.params.text}],
                text: ""
            }
        case LIST_REMOVE_TASK:
            return {
                ...state,
                tasks: [ ...state.tasks.slice(0, action.params.index), ...state.tasks.slice(action.params.index + 1) ]
            }
        case LIST_GET_TASKS: 
            return {
                ...state,
                refreshing: !state.refreshing
            }
        case LIST_LOAD_TASKS: {
            let jsonfile
            switch(action.params.task_number) {
                case LIST_SIZE_SMALL: {
                    jsonfile = require("../../db/MOCK_DATA_100.json")
                    break;
                }
                case LIST_SIZE_MEDIUM: {
                    jsonfile = require("../../db/MOCK_DATA_500.json")
                    break;
                }
                case LIST_SIZE_BIG: {
                    jsonfile = require("../../db/MOCK_DATA_1000.json")
                    break;
                }
            }
            return {
                ...state,
                tasks: jsonfile
            }
        }
        default:
            return state;
    }
};

export default TaskListReducer;