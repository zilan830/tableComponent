import React, { Component } from 'react';
import RichTable from "./table";
import Filter from "./filter";
import Operate from "./operate";
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
    return (
      <div className="tableContainer">
        <Filter searchColumns={this.props.searchColumns} search={this.props.search}/>
        <Operate/>
        <RichTable {...this.props}/>
      </div>
    );
  }
}