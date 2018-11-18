import React, { Component } from "react";
import { RootNav } from "./navigation/navigators";
import {Provider} from "react-redux";
import {store} from "./store";


export default class TodoApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <RootNav/>
            </Provider>
        );
    }
}
