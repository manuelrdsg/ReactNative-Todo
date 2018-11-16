import React, { Component } from "react";
import {
    AppRegistry,
    Text,
    View,
    FlatList,
    KeyboardAvoidingView,
    AsyncStorage,
    TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./landingView.Styles";
import MyListItem from "../../components/list-item/ListItem"
import now from 'performance-now';

const TASK_NUMBER = '100';
const LIST_SIZE = {
    small: '100',
    medium: '500',
    big: '1000'
}
const ACTIONS = {
    add_task: "add",
    remove_task: "remove",
    update_tasks: "update",
    load_json: "json"
}


export class landingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
        tasks: [],
        text: "",
        refreshing: false,
        Times: {
            loadJson: {
            updateTodos: [],
            saveTodos: [],
            loadJson: [],
            Total: []
            },
            loadJsonAverage: 0.0,
            loadJsonTotalAverage: 0.0,
            addTask: {
            updateTodos: [],
            saveTodos: [],
            addTodo: [],
            Total: []
            },
            addTasksAverage: 0.0,
            addTasksTotalAverage: 0.0,
            getTasks: [],
            getTasksAverage: 0.0,
            removeTask: {
            updateTodos: [],
            saveTodos: [],
            removeTodo: [],
            Total: []
            },
            removeTasksAverage: 0.0,
            removeTasksTotalAverage: 0.0
        }
        };
    }


    componentDidMount() {
        this._loadMockData(TASK_NUMBER);
    }

    _loadMockData() {

        t1 = now();

        var jsonfile;

        switch(TASK_NUMBER) {
            case LIST_SIZE.small: {
                jsonfile = require("../../../db/MOCK_DATA_100.json")
                break;
            }
            case LIST_SIZE.medium: {
                jsonfile = require("../../../db/MOCK_DATA_500.json")
                break;
            }
            case LIST_SIZE.big: {
                jsonfile = require("../../../db/MOCK_DATA_1000.json")
                break;
            }
            default: return
        }


        this._saveTodos(jsonfile, "json");
        this._updateTodos("json");

        var t2 = now();

        let timesCopy = this.state.Times
        timesCopy.loadJson.loadJson = [...timesCopy.loadJson.loadJson, t2-t1]
        this.setState({
            Times: timesCopy
        })
    }

    async _updateTodos(call) {
        var t1 = now();

        AsyncStorage.getItem("Tasks")
        .then( (tasks) => {
            let parsed_tasks = JSON.parse(tasks)
            this.setState({
            tasks: parsed_tasks
            });
        }).catch( function(error){
            console.log(error);
        });

        this.setState({ refreshing: false });

        var t2 = now();

        switch(call) {
            case ACTIONS.add_task: {
                let timesCopy = this.state.Times
                timesCopy.addTask.updateTodos = [...timesCopy.addTask.updateTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            case ACTIONS.remove_task: {
                let timesCopy = this.state.Times
                timesCopy.removeTask.updateTodos = [...timesCopy.removeTask.updateTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            case ACTIONS.load_json: {
                let timesCopy = this.state.Times
                timesCopy.loadJson.updateTodos = [...timesCopy.loadJson.updateTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            default:
        }
    }

    async _wipeTodos() {
        await AsyncStorage.clear();
    }

    async _saveTodos(tasks, call) {
        t1 = now();

        AsyncStorage.setItem("Tasks", JSON.stringify(tasks))
        .catch( function(error){
            console.log(error);
        });

        var t2 = now();

        switch(call) {
            case ACTIONS.add_task: {
                let timesCopy = this.state.Times
                timesCopy.addTask.saveTodos = [...timesCopy.addTask.saveTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            case ACTIONS.remove_task: {
                let timesCopy = this.state.Times
                timesCopy.removeTask.saveTodos = [...timesCopy.removeTask.saveTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            case ACTIONS.load_json: {
                let timesCopy = this.state.Times
                timesCopy.loadJson.saveTodos = [...timesCopy.loadJson.saveTodos, t2-t1]
                this.setState({
                    Times: timesCopy
                })
                break;
            }
            default:
        }
    }

    addToDo = () => {
        var t1 = now();

        let notEmpty = this.state.text.trim().length > 0;

        if (notEmpty) {
            const tasks = this.state.tasks.concat({
                key: String(Math.random()),
                text: this.state.text
            });
            this._saveTodos(tasks, "add");
            this._updateTodos("add");
        }

        setTimeout(() => this.flatlist.scrollToEnd(), 200);
        this.changeTextInput("");

        var t2 = now();

        if (notEmpty) {

            let timesCopy = this.state.Times
            timesCopy.addTask.addTodo = [...timesCopy.addTask.addTodo, t2-t1]
            this.setState({
                Times: timesCopy
            })
        }
    };

    deleteToDo = (index) => () => {
        var t1 = now();

        var array = this.state.tasks;
        array.splice(index, 1);
        this.setState({ tasks: array });

        this._saveTodos(this.state.tasks, "remove");
        this._updateTodos("remove");

        var t2 = now();

        let timesCopy = this.state.Times
        timesCopy.removeTask.removeTodo = [...timesCopy.removeTask.removeTodo, t2-t1]
        this.setState({
            Times: timesCopy
        })
    };

    changeTextInput(text) {
        this.setState({
        text
        });
    }

    sendTimes = () => {
        for (i = 0; i < 100; i++) {
        this.state.Times.loadJson.Total[i] =
            this.state.Times.loadJson.updateTodos[i] +
            this.state.Times.loadJson.saveTodos[i] +
            this.state.Times.loadJson.loadJson[i];
        this.state.Times.addTask.Total[i] =
            this.state.Times.addTask.updateTodos[i] +
            this.state.Times.addTask.saveTodos[i] +
            this.state.Times.addTask.addTodo[i];
        this.state.Times.removeTask.Total[i] =
            this.state.Times.removeTask.updateTodos[i] +
            this.state.Times.removeTask.saveTodos[i] +
            this.state.Times.removeTask.removeTodo[i];
        }

        this.state.Times.addTasksTotalAverage =
        this.state.Times.addTask.Total.reduce((a, b) => a + b, 0) /
        this.state.Times.addTask.Total.length;
        this.state.Times.addTasksAverage =
        this.state.Times.addTask.addTodo.reduce((a, b) => a + b, 0) /
        this.state.Times.addTask.addTodo.length;
        this.state.Times.removeTasksTotalAverage =
        this.state.Times.removeTask.Total.reduce((a, b) => a + b, 0) /
        this.state.Times.removeTask.Total.length;
        this.state.Times.removeTasksAverage =
        this.state.Times.removeTask.removeTodo.reduce((a, b) => a + b, 0) /
        this.state.Times.removeTask.removeTodo.length;
        this.state.Times.getTasksAverage =
        this.state.Times.getTasks.reduce((a, b) => a + b, 0) /
        this.state.Times.getTasks.length;
        this.state.Times.loadJsonTotalAverage =
        this.state.Times.loadJson.Total.reduce((a, b) => a + b, 0) /
        this.state.Times.loadJson.Total.length;
        this.state.Times.loadJsonAverage =
        this.state.Times.loadJson.loadJson.reduce((a, b) => a + b, 0) /
        this.state.Times.loadJson.loadJson.length;

        console.log(this.state.Times);
        console.log("AddTasks() Average", this.state.Times.addTasksTotalAverage);
        console.log("removeTask() Average", this.state.Times.removeTasksTotalAverage);
        console.log("GetTasks() Average", this.state.Times.getTasksAverage);
        console.log("LoadJSON() Average", this.state.Times.loadJsonTotalAverage);

        fetch('http://206.189.124.252:8080/test', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstParam: this.state.Times,
            addTask: this.state.Times.addTask.saveTodos.length,
            loadJson: this.state.Times.loadJson.saveTodos.length,
            GetTasks: this.state.Times.getTasks.length,
            RemoveTasks: this.state.Times.removeTask.saveTodos.length
        })
        });
    };

    handleRefresh = () => {

        var t1 = now();
        this.setState({ refreshing: true }, () => {
        this._updateTodos();
        });
        var t2 = now();


        timesCopy = this.state.Times
        timesCopy.getTasks = [...timesCopy.getTasks, t2-t1]
        this.setState({
            Times: timesCopy
        })

    };

    handleTopScroll = () => {
        setTimeout(
        () => this.flatlist.scrollTo({ x: 0, y: 0, animated: true }),
        200
        );
    };

    renderSeparator = () => {
        return (
        <View style={styles.separator}/>
        );
    };

    renderItem = ({ item, index }) => (
        <MyListItem
        index={index}
        task_text={item.text}
        onPress={ this.deleteToDo(index) }
        />
    );

    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <FlatList
            data={this.state.tasks}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
            ref={flatlist => (this.flatlist = flatlist)}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ItemSeparatorComponent={this.renderSeparator}
            initialNumToRender={100}
            />
                <View style={styles.row}>
                    <TextInput
                        style={styles.text_imput}
                        placeholder="Enter new task..."
                        maxLength={20}
                        onChangeText={text => this.setState({ text })}
                        onSubmitEditing={this.addToDo}
                        value={this.state.text}
                    />
                    <Icon
                        name="paper-plane"
                        size={30}
                        color="#3e89d6"
                        onPress={this.addToDo}
                    />
                </View>
            <View style={styles.debug_bar}>
                <Icon
                    name="cloud-upload"
                    size={30}
                    color="orange"
                    onPress={this.sendTimes}
                />
                <Text style={styles.debug_text}>
                    DEBUG
                </Text>
                <Icon
                    name="repeat"
                    size={30}
                    color="orange"
                    onPress={() => this._loadMockData(TASK_NUMBER)}
                />
            </View>
        </KeyboardAvoidingView>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent("TodoApp", () => TodoApp);
