import React, { Component } from 'react';
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
} from 'react-native';
import { Button, FormInput, Header, ListItem, List } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './app/styles/styles';
import ipServer from './app/variables';

export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: '',
      refreshing: false,
      Times: {
        loadJson: {
          updateTodos: [],
          saveTodos: [],
          loadJson: [],
          Total: []
        },
        loadJsonAverage: 0.000000,
        addTask: {
          updateTodos: [],
          saveTodos: [],
          addTodo: [],
          Total: []
        },
        addTasksAverage: 0.000000,
        getTasks: [],
        getTasksAverage: 0.000000,
        removeTask: {
          updateTodos: [],
          saveTodos: [],
          removeTodo:[],
          Total: []
        },
        removeTasksAverage: 0.000000
       },
      };
  }

  componentDidMount() {
    this._loadMockData("1000");
  }

  _loadMockData(file) {
    t1 = Date.now()

    var jsonfile;

    if(file === "100")
      jsonfile = require('./db/MOCK_DATA_100.json')
    else if(file === "500")
      jsonfile = require('./db/MOCK_DATA_500.json')
    else if(file === "1000")
      jsonfile = require('./db/MOCK_DATA_1000.json')
    else
      return;
  
    this._saveTodos(jsonfile, "json");
    this._updateTodos("json");

    var t2 = Date.now()

    this.state.Times.loadJson.loadJson.push(t2-t1);
    console.log("LoadJson: ", this.state.Times.loadJson.loadJson.length);
    
}

  async _updateTodos(call) {

    t1 = Date.now();

    let response = await AsyncStorage.getItem('Tasks');
    let tasks = await JSON.parse(response) || [];

    this.setState({
      tasks
    });

    var t2 = Date.now()

    this.setState({refreshing: false});

    if(call == 'add') {
      this.state.Times.addTask.updateTodos.push(t2-t1);
      console.log("Add._updateTodos: ", this.state.Times.addTask.updateTodos.length);
    }
    else if(call == 'remove') {
      this.state.Times.removeTask.updateTodos.push(t2-t1); 
      console.log("Remove._updateTodos: ", this.state.Times.removeTask.updateTodos.length);
    }
    else if(call == 'json') {
      this.state.Times.loadJson.updateTodos.push(t2-t1); 
      console.log("Json._updateTodos: ", this.state.Times.loadJson.updateTodos.length);
    }
    else {
      this.state.Times.getTasks.push(t2-t1); 
      console.log("_updateTodos: ", this.state.Times.getTasks.length);
    } 
  };

  async _wipeTodos() {
    await AsyncStorage.clear();
  }

  async _saveTodos(tasks, call) {
    t1 = Date.now()

    await AsyncStorage.setItem('Tasks', JSON.stringify(tasks));

    var t2 = Date.now()

    if(call == 'add') {
      this.state.Times.addTask.saveTodos.push(t2-t1);
      console.log("Add._saveTodos: ", this.state.Times.addTask.saveTodos.length);
    }
    else if(call == 'remove') {
      this.state.Times.removeTask.saveTodos.push(t2-t1); 
      console.log("Remove._saveTodos: ", this.state.Times.removeTask.saveTodos.length);
    }
    else if(call == 'json') {
      this.state.Times.loadJson.saveTodos.push(t2-t1); 
      console.log("Json._saveTodos: ", this.state.Times.loadJson.saveTodos.length);
    }

  }

  async _debugTodos() {
    console.log('********DEBUG - AsyncStorage*******')
    let response = await AsyncStorage.getItem('Tasks');
    let tasks = await JSON.parse(response) || [];
    console.log(tasks);
    console.log('********************');
  }

  _debugTodosState() {
    console.log('%%%%%%%DEBUG - State%%%%%%%')
    console.log(this.state.tasks);
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  }

  addToDo = () => {

    var t1 = Date.now();

    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {

      const tasks = this.state.tasks.concat({ key: String(Math.random()), text: this.state.text });
      this._saveTodos(tasks, "add");
      this._updateTodos("add");
    }

    setTimeout(() => this.flatlist.scrollToEnd(), 200)
    this.changeTextInput("");

    var t2 = Date.now()

    if(notEmpty) {
      this.state.Times.addTask.addTodo.push(t2-t1);
      console.log("AddTask: ", this.state.Times.addTask.addTodo.length);
    }

  };

  deleteToDo = (index) => () => {
    var t1 = Date.now();

    var array = this.state.tasks;
    array.splice(index, 1);
    this.setState({ tasks: array })

    this._saveTodos(this.state.tasks, "remove");
    this._updateTodos("remove");

    var t2 = Date.now()
    this.state.Times.removeTask.removeTodo.push(t2-t1);
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

    for(i = 0; i < 100; i++) {
      console.log(i);
      this.state.Times.loadJson.Total[i] = this.state.Times.loadJson.updateTodos[i] + this.state.Times.loadJson.saveTodos[i] + this.state.Times.loadJson.loadJson[i];
      this.state.Times.addTask.Total[i] = this.state.Times.addTask.updateTodos[i] + this.state.Times.addTask.saveTodos[i] + this.state.Times.addTask.addTodo[i];
      this.state.Times.removeTask.Total[i] = this.state.Times.removeTask.updateTodos[i] + this.state.Times.removeTask.saveTodos[i] + this.state.Times.removeTask.removeTodo[i];
    }

    this.state.Times.addTasksAverage = this.state.Times.addTask.Total.reduce((a, b) => a + b, 0)/this.state.Times.addTask.Total.length;
    this.state.Times.removeTasksAverage = this.state.Times.removeTask.Total.reduce((a, b) => a + b, 0)/this.state.Times.removeTask.Total.length;
    this.state.Times.getTasksAverage = this.state.Times.getTasks.reduce((a, b) => a + b, 0)/this.state.Times.getTasks.length;
    this.state.Times.loadJsonAverage = this.state.Times.loadJson.Total.reduce((a, b) => a + b, 0)/this.state.Times.loadJson.Total.length;

    console.log(this.state.Times);
    console.log("AddTasks() Average", this.state.Times.addTasksAverage);
    console.log("removeTask() Average", this.state.Times.removeTasksAverage);
    console.log("GetTasks() Average", this.state.Times.getTasksAverage);
    console.log("LoadJSON() Average", this.state.Times.loadJsonAverage);

    fetch(ipServer, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: this.state.Times,
        addTask: this.state.Times.addTask.saveTodos.length,
        loadJson: this.state.Times.loadJson.saveTodos.length,
        GetTasks: this.state.Times.getTasks.length,
        RemoveTasks: this.state.Times.removeTask.saveTodos.length
      }),
    });


  }

  handleRefresh = () => {
    this.setState({refreshing: true},
    () => {
      this._updateTodos();
    });
  }

  handleTopScroll = () => {
    setTimeout(() => this.flatlist.scrollTo({x: 0, y: 0, animated: true}), 200);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
          marginRight: '5%',
        }}
      />
    );
  }

  renderFooter = () => {
    return (
      <View style={{paddingVertical:20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }  

  renderItem = ({ item, index }) => (
    <ListItem
      title={<Text style={{fontSize: 17}}> <Text style={{fontWeight: 'bold'}}>{index + 1}.-</Text>{item.text}</Text>}
      containerStyle={{ borderBottomWidth: 0 }}
      rightIcon={<Icon name="trash" style={styles.button_del} size={25} color="red" onPress={this.deleteToDo(index)} />}
    />
)

  render() {
    return (
      <View style={styles.container}>
        <Header onPress={this.handleTopScroll} centerComponent={{ text: 'TodoApp', style: { color: '#fff', fontSize: 18 } }} />
          <FlatList
            data={this.state.tasks}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
            ref={flatlist => this.flatlist = flatlist}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
            ItemSeparatorComponent={this.renderSeparator}
            initialNumToRender={500}
          />
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.row}
        >
          <FormInput
            ref={input => this.input = input}
            containerStyle={styles.text_imput}
            inputStyle={{ fontSize: 25 }}
            onChangeText={(text) => this.setState({ text })}
            blurOnSubmit={true}
            onSubmitEditing={this.addToDo}
            placeholder={'Enter new task…'}
            maxLength={20}
          />
          <Icon name="paper-plane" size={30} color="#3e89d6" onPress={this.addToDo} />
        </KeyboardAvoidingView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft:'2%', marginRight:'2%'}}>
          <Icon name="cloud-upload" size={30} color="orange" onPress={this.sendTimes} />
          <Text style={{fontWeight: 'bold', fontSize: 17, color: 'orange'}}>DEBUG</Text>
          <Icon name="repeat" size={30} color="orange" onPress={() => this._loadMockData("1000")} />
        </View>
      </View>
    );
  }

}

// skip this line if using Create React Native App
AppRegistry.registerComponent('ToDoApp', () => ToDoApp);
