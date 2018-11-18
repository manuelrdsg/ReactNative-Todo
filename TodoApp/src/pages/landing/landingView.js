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

const TASK_NUMBER = '100'

export class landingView extends Component {

    componentDidMount() {
        this.props.loadTasks({"task_number": TASK_NUMBER})
    }

    renderSeparator = () => {
        return (
        <View style={styles.separator}/>
        );
    };

    renderItem = ({ item, index }) => (
        <MyListItem
        index={index}
        task_text={item.text}
        onPress={() => {
            this.props.removeTask({"index": index})
        }}
        />
    );

    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <FlatList
            data={this.props.tasks}
            renderItem={this.renderItem}
            keyExtractor={item => item.key}
            ref={flatlist => (this.flatlist = flatlist)}
            refreshing={this.props.refreshing}
            onRefresh={() => {
                this.props.getTasks()
            }}
            ItemSeparatorComponent={this.renderSeparator}
            initialNumToRender={100}
            />
                <View style={styles.row}>
                    <TextInput
                        style={styles.text_imput}
                        placeholder="Enter new task..."
                        maxLength={20}
                        onChangeText={text => this.props.changeText({ text })}
                        onSubmitEditing={() => {
                            this.props.addTask({'text':this.props.text})
                        }}
                        value={this.props.text}
                    />
                    <Icon
                        name="paper-plane"
                        size={30}
                        color="#3e89d6"
                        onPress={() => {
                            this.props.addTask({'text':this.props.text})
                        }}
                    />
                </View>
            <View style={styles.debug_bar}>
                <Icon
                    name="cloud-upload"
                    size={30}
                    color="orange"
                    onPress={() => console.log('sendTimes')}
                />
                <Text style={styles.debug_text}>
                    DEBUG
                </Text>
                <Icon
                    name="repeat"
                    size={30}
                    color="orange"
                    onPress={() => this.props.loadTasks({'task_number': TASK_NUMBER})}
                />
            </View>
        </KeyboardAvoidingView>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent("TodoApp", () => TodoApp);
