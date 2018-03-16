import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { Button, FormInput, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './app/styles/styles';

export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: '',
      addTimes: [],
      deleteTimes: [],
      updateTimes: []
    };
  }

  componentDidMount() {
    this._wipeTodos();
    this._loadMockData("00");
    this._updateTodos();
  }

  _loadMockData(file) {

    var jsonfile;

    if(file === "100")
      jsonfile = require('./db/MOCK_DATA_100.json')
    else if(file === "500")
      jsonfile = require('./db/MOCK_DATA_500.json')
    else if(file === "1000")
      jsonfile = require('./db/MOCK_DATA_1000.json')
    else
      return;
  
    this._saveTodos(jsonfile);
    
}

  async _updateTodos() {
    t1 = performance.now();

    let response = await AsyncStorage.getItem('Tasks');
    let tasks = await JSON.parse(response) || [];

    this.setState({
      tasks
    });

    t2 = performance.now();
    this.state.updateTimes.push(t2-t1);

    console.log("updateTimes: " + this.state.updateTimes)
    console.log("addTimes: " + this.state.addTimes)
    console.log("deleteTimes: " + this.state.deleteTimes)

    //this.saveCSV(this.state.updateTimes, "updateTimes")
  };

  // saveCSV(data, name) {

  //   csvString = data.valueOf();

  //   var a         = React.createElement('a');
  //   a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
  //   a.target      = '_blank';
  //   a.download    = name + '.csv';

  //   document.body.appendChild(a);
  //   a.click();
  // }

  async _wipeTodos() {
    await AsyncStorage.clear();
  }

  async _saveTodos(tasks) {
    await AsyncStorage.setItem('Tasks', JSON.stringify(tasks));
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

  addToDo() {
    t1 = performance.now();

    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {

      const tasks = this.state.tasks.concat({ key: String(Math.random()), text: this.state.text });
      this._saveTodos(tasks);
      this._updateTodos();
    }

    setTimeout(() => this.flatlist.scrollToEnd(), 200)
    this.changeTextInput("");

    t2 = performance.now();
    this.state.addTimes.push(t2-t1);
  };

  deleteToDo(index) {
    t1 = performance.now();

    var array = this.state.tasks;
    array.splice(index, 1);
    this.setState({ tasks: array })

    this._saveTodos(this.state.tasks);
    this._updateTodos();
    console.timeEnd('deleteTodo');

    t2 = performance.now();
    this.state.deleteTimes.push(t2-t1);
  };

  changeTextInput(text) {
    this.setState({
      text
    });
    this.input.clearText();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'TodoApp', style: { color: '#fff', fontSize: 18 } }} />
        {/* <Icon name="paper-plane" size={30} color="black" onPress={() => this._debugTodos()} />
        <Icon name="paper-plane" size={30} color="red" onPress={() => this._debugTodosState()} /> */}
        <FlatList
          ref={flatlist => this.flatlist = flatlist}
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.list_row}>
                <Text style={styles.item}>{String(index + 1)}.- {item.text}</Text>
                <Icon name="times-circle" style={styles.button_del} size={30} color="#900" onPress={() => this.deleteToDo(index)} />
              </View>
              <View style={styles.line}></View>
            </View>
          }
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
            onSubmitEditing={
              () => this.addToDo()
            }
            placeholder='Enter new task…'
          />
          <Icon name="paper-plane" size={30} color="lightblue" onPress={() => this.addToDo()} />
        </KeyboardAvoidingView>
      </View>
    );
  }

}

// skip this line if using Create React Native App
AppRegistry.registerComponent('ToDoApp', () => ToDoApp);