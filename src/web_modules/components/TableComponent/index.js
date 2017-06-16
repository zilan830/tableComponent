import React, { Component } from 'react';
import RichTable from "./table";
import { message } from "antd";
import './style.less';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
   
  }

  render() {
    console.log("this.props",this.props)
    return (
      <div className="tableContainer">
        <RichTable {...this.props}/>
      </div>
    );
  }
}