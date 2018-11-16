import { connect } from 'react-redux'
import { landingView } from './landingView'
import { addTask, removeTask, getTasks, loadTasks } from '../../actions'

const mapStateToProps = (state) => {
    return {
        tasks: state.taskListReducer.task
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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