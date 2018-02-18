import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  //TextInput,
  View,
  StyleSheet,
  //Button,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import { Button, FormInput, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            tasks: tasks.concat({ key: Math.random(), text: text })
          };
        }
      );
    }
    this.input.clearText();
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
        <Header centerComponent={{ text: 'TodoApp', style: { color: '#fff', fontSize: 18 } }} />
        {/* <Text style={styles.head}>Todo App</Text>
        <View style={styles.line} /> */}
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
          {/* <TextInput
            style={styles.text_imput}
            ref={input => { this.textInput = input }}
            placeholder="Enter new task"
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={
              () => this.addToDo()
            }
          /> */}
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