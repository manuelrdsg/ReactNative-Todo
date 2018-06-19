import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from 'react-native';
import styles from "./styles/styles";
import TodoApp from '../App';



export default class MyListItem extends React.PureComponent {

    constructor(props) {
        super(props);
      }

    render() {
      return (
        <ListItem
        title={
          <Text style={{ fontSize: 17 }}>
            {" "}
            <Text style={{ fontWeight: "bold" }}>{this.props.index + 1}.-</Text>
            {this.props.task_text}
          </Text>
        }
        containerStyle={{ borderBottomWidth: 0 }}
        rightIcon={
          <Icon
            name="trash"
            style={styles.button_del}
            size={25}
            color="red"
            onPress={this.props.onPress}
          />
        }
      />
       )
    }
  }