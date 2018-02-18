import React, { Component } from 'react';
import { 
  AppRegistry, 
  Text, 
  TextInput, 
  View,
  StyleSheet,
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView 
} from 'react-native';
// import {
//   Button,
// } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './app/styles/styles';

export default class ToDoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      tasks: []
    };
  }

  addToDo = () => {

    console.log(this.state.tasks);
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { text, tasks } = prevState;
          return {
            text: "",
            tasks: tasks.concat({key: Math.random(), text: text })
          };
        }
      );
    }
    this.textInput.clear();
  };

  deleteToDo = key => {
    this.setState(
      prevState => {

        let array = prevState.tasks.slice();
        array.splice(key, 1);

        return {
          tasks: array
        };
      }
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>Todo App</Text>
        <View style={styles.line} />
        <FlatList
          data={this.state.tasks}
          renderItem={({ item, index }) => 
          <View style={styles.list_row}>
          <Text style={styles.item}>{index +1}.- {item.text}</Text>
          <Button title="X" onPress={() => this.deleteToDo(index)} />
          </View>}
        />
        <KeyboardAvoidingView
          //style={styles.container}
          behavior='padding' 
        >
        <TextInput
          style={styles.text_imput}
          ref={input => { this.textInput = input }}
          placeholder="Enter new To-Do"
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={
            () => this.addToDo()
          }
        />
        </KeyboardAvoidingView>
        {/* <Button
          //style = {styles.add_button}
          icon={{name: 'add-circle', size: 32}}
          color='blue'
          onPress={this.changeTort()}
        /> */}
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('ToDoApp', () => ToDoApp);