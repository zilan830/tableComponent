import React, { Component } from 'react';
import { Input, Button } from "antd";
import "./style.less";

export default class Operate extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div className="operateContainer">
              操作框 ：
              <div className="btnContainer">
                  <Button></Button>
              </div>
            </div>
        )
    }
}