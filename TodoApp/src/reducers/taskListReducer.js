import { LIST_ADD_TASK, LIST_REMOVE_TASK, LIST_GET_TASKS, LIST_LOAD_TASKS } from '../actions/ActionConstants'

const initialState = {
    tasks: [],
    text: "",
    refreshing: false
}

const TaskListReducer = (state = initialState, action) => {
    console.log("Reducer: ")
    console.log(action.params)
    switch(action.type) {
        case LIST_ADD_TASK:
            return {
                ...state, 
                tasks: [...state.tasks, {key: Math.random(), text:action.params.text}]
            }
        case LIST_REMOVE_TASK:
            return {
                ...state,
                tasks: [ ...state.tasks.slice(0, action.params.index), ...arr.slice(action.params.index + 1) ]
            }
        case LIST_GET_TASKS: 
            return {
                ...state
            }
        case LIST_LOAD_TASKS: {
            let jsonfile
            switch(action.params.task_number) {
                case LIST_SIZE.small: {
                    jsonfile = require("../../db/MOCK_DATA_100.json")
                    break;
                }
                case LIST_SIZE.medium: {
                    jsonfile = require("../../db/MOCK_DATA_500.json")
                    break;
                }
                case LIST_SIZE.big: {
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