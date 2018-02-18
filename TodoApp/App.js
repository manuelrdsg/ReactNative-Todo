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
      text: ''
    };
  }

  async _updateTodos() {
    let response = await AsyncStorage.getItem('Tasks');
    let tasks = await JSON.parse(response) || [];

    this.setState({
      tasks
    });

  };

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

    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {

      const tasks = this.state.tasks.concat({ key: Math.random(), text: this.state.text });
      this._saveTodos(tasks);
      this._updateTodos();
    }

    this.changeTextInput("");
  };

  deleteToDo(index) {
    var array = this.state.tasks;
    array.splice(index, 1);
    this.setState({ tasks: array })

    this._saveTodos(this.state.tasks);
    this._updateTodos();

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
          data={this.state.tasks}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.list_row}>
                <Text style={styles.item}>{index + 1}.- {item.text}</Text>
                <Icon name="times" style={styles.button_del} size={30} color="#900" onPress={() => this.deleteToDo(index)} />
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