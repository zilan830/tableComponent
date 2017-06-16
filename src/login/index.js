import React, { Component } from 'react';
import System from 'api/system';
import Api from 'web_modules';
import './style.less';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handlerPost = this.handlerPost.bind(this);
    this.handlerGet = this.handlerGet.bind(this);
    this.handlerPut = this.handlerPut.bind(this);
    this.handlerDelete = this.handlerDelete.bind(this);
    this.handlerPatch = this.handlerPatch.bind(this);
  }

  handlerPost() {
    this.setState({ isLoading: true });
    System.postSample('lingjia', '123456').then((res) => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    }).then(() => {
      console.log('execute always');
    });
  }

  handlerGet() {
    System.getSample().then((res) => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  handlerDelete() {
    System.deleteSample('123').then((res) => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  handlerPut() {
    System.putSample({ 'name': 'noa', 'age': 20 }).then((res) => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  handlerPatch() {
    System.patchSample({ 'name': 'noa', 'age': 20 }).then((res) => {
      console.log(res);
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <h1>接口范例</h1>
        <div className="mb_10"><button onClick={this.handlerPost}>POST</button></div>
        <div className="mb_10"><button onClick={this.handlerGet}>GET</button></div>
        <div className="mb_10"><button onClick={this.handlerDelete}>DELETE</button></div>
        <div className="mb_10"><button onClick={this.handlerPut}>PUT</button></div>
        <div className="mb_10"><button onClick={this.handlerPatch}>PATCH</button></div>
      </div>
    );
  }
}
