import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator,
  TextInput
} from "react-native";
import {
  Button,
  FormInput,
  Header,
  ListItem,
  List
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./app/styles/styles";
import ipServer from "./app/variables";
import MyListItem from "./app/ListItem"
import now from 'performance-now';

const TASK_NUMBER = '1000';

export default class TodoApp extends Component {
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

  _loadMockData(file) {

    t1 = now();

    var jsonfile;

    if (file === "100") jsonfile = require("./db/MOCK_DATA_100.json");
    else if (file === "500") jsonfile = require("./db/MOCK_DATA_500.json");
    else if (file === "1000") jsonfile = require("./db/MOCK_DATA_1000.json");
    else return;

    console.log("calling savetodos")
    this._saveTodos(jsonfile, "json");
    
    console.log("calling updatetodos")
    this._updateTodos("json");

    var t2 = now();

    this.state.Times.loadJson.loadJson.push(t2 - t1);
    console.log("LoadJson: ", this.state.Times.loadJson.loadJson.length);
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

    console.log("_updateTodos");

    if (call == "add") {
      this.state.Times.addTask.updateTodos.push(t2 - t1);
      console.log(
        "Add._updateTodos: ",
        this.state.Times.addTask.updateTodos.length
      );
    } else if (call == "remove") {
      this.state.Times.removeTask.updateTodos.push(t2 - t1);
      console.log(
        "Remove._updateTodos: ",
        this.state.Times.removeTask.updateTodos.length
      );
    } else if (call == "json") {
      this.state.Times.loadJson.updateTodos.push(t2 - t1);
      console.log(
        "Json._updateTodos: ",
        this.state.Times.loadJson.updateTodos.length
      );
    } else {
      // this.state.Times.getTasks.push(t2 - t1);
      // console.log("_updateTodos: ", this.state.Times.getTasks.length);
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

    console.log("_saveTodos")

    if (call == "add") {
      this.state.Times.addTask.saveTodos.push(t2 - t1);
      console.log(
        "Add._saveTodos: ",
        this.state.Times.addTask.saveTodos.length
      );
    } else if (call == "remove") {
      this.state.Times.removeTask.saveTodos.push(t2 - t1);
      console.log(
        "Remove._saveTodos: ",
        this.state.Times.removeTask.saveTodos.length
      );
    } else if (call == "json") {
      this.state.Times.loadJson.saveTodos.push(t2 - t1);
      console.log(
        "Json._saveTodos: ",
        this.state.Times.loadJson.saveTodos.length
      );
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
      this.state.Times.addTask.addTodo.push(t2 - t1);
      console.log("AddTask: ", this.state.Times.addTask.addTodo.length);
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
    this.state.Times.removeTask.removeTodo.push(t2 - t1);
    console.log("RemoveTask: ", this.state.Times.removeTask.removeTodo.length);
  };

  changeTextInput(text) {
    this.setState({
      text
    });
    this.input.blur();
    this.input.clearText();
  }

  sendTimes = () => {
    for (i = 0; i < 100; i++) {
      console.log(i);
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
    console.log(t1);
    this.setState({ refreshing: true }, () => {
      this._updateTodos();
    });
    var t2 = now();
    console.log(t2);

    this.state.Times.getTasks.push(t2 - t1);
    console.log("_updateTodos: ", this.state.Times.getTasks.length);

  };

  handleTopScroll = () => {
    setTimeout(
      () => this.flatlist.scrollTo({ x: 0, y: 0, animated: true }),
      200
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
          marginRight: "5%"
        }}
      />
    );
  };

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
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
      <View style={styles.container}>
        <Header
          onPress={this.handleTopScroll}
          centerComponent={{
            text: "TodoApp",
            style: { color: "#fff", fontSize: 18 }
          }}
        />
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
        <KeyboardAvoidingView behavior="padding" style={styles.row}>
          <FormInput
            ref={input => (this.input = input)}
            containerStyle={styles.text_imput}
            inputStyle={{ fontSize: 25 }}
            onChangeText={text => this.setState({ text })}
            blurOnSubmit={true}
            onSubmitEditing={this.addToDo}
            placeholder={"Enter new task…"}
            maxLength={20}
          />
          <Icon
            name="paper-plane"
            size={30}
            color="#3e89d6"
            onPress={this.addToDo}
          />
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "2%",
            marginRight: "2%"
          }}
        >
          <Icon
            name="cloud-upload"
            size={30}
            color="orange"
            onPress={this.sendTimes}
          />
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "orange" }}>
            DEBUG
          </Text>
          <Icon
            name="repeat"
            size={30}
            color="orange"
            onPress={() => this._loadMockData(TASK_NUMBER)}
          />
        </View>
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent("TodoApp", () => TodoApp);
