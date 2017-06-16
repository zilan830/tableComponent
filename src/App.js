import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./web_modules/store";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("will load app");
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
