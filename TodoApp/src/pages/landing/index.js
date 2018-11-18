import { connect } from 'react-redux'
import { landingView } from './landingView'
import { addTask, removeTask, getTasks, loadTasks, changeText } from '../../actions/ListActions'

const mapStateToProps = (state) => {
    return {
        tasks: state.taskListReducer.tasks,
        text: state.taskListReducer.text,
        refreshing: state.taskListReducer.refreshing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeText: 
            (params) => {
                dispatch(changeText(params))
            },
        addTask:
            (params) => {
                dispatch(addTask(params))
            },
        removeTask:
            (params) => {
                dispatch(removeTask(params))
            },
        getTasks:
            () => {
                dispatch(getTasks())
            },
        loadTasks:
            (params) => {
                dispatch(loadTasks(params))
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingView)