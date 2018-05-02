import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

class MyListItem extends React.PureComponent {

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

    render() {
      return (
            <View>
                <ListItem
                    title={`${index + 1}.-${item.text}`}
                    containerStyle={{ borderBottomWidth: 0 }}
                    rightIcon={<Icon name="times-circle" style={styles.button_del} size={30} color="#900" onPress={this.deleteToDo(index)} />}
                />
            </View>
       )
    }
  }