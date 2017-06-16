import React, { Component } from 'react';
import RichTable from "./table";
import { Table, Dropdown, Button, Icon, Row, Col } from "antd";
import './style.less';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      dataSource: [],
    }
  }

  componentDidMount() {
    const { columns, dataSource } = this.props;
    this.setState({
      columns: columns,
      dataSource: dataSource,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { columns, dataSource } = nextProps;
      console.log("dataSorce", dataSource)
      this.setState({
        columns: columns,
        dataSource: dataSource,
      })
    }
  }

  render() {
    const { columns, dataSource } = this.state;
    return (
      <div className="table-container">
        <RichTable columns={columns} dataSource={dataSource} getData={this.props.getData}/>
      </div>
    );
  }
}