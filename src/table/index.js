import React, { Component } from 'react';
import TableComponent from '../web_modules/components/TableComponent';
import { connect } from "react-redux";
import { RequestAction } from "../web_modules/actions";

const mapStateToProps = (state, oenProps) => {
  console.log("state",state.request)
  return {
    data:state.request,
  }
}

class Table extends Component {
  constructor(props) {
    super(props);
    const columns = [
        {
          title: "转出账户",
          dataIndex: "acctName",
          key: "acctName"
        },
        {
          title: "收账账户",
          dataIndex: "targetAcctName",
          key: "targetAcctName"
        },
        {
          title: "金额",
          dataIndex: "amount",
          key: "amount"
        },
        {
          title: "操作人",
          dataIndex: "addUserName",
          key: "addUserName"
        },
        {
          title: "操作时间",
          dataIndex: "addTime",
          key: "addTime",
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
        }
      ];
      const searchColumns=[{
                groupName: "g1",
                multi: true,
                selected: [],
                lables: [
                    {
                        name: "标签一",
                        value: "1",
                    },
                    {
                        name: "标签二",
                        value: "2",
                    },
                    {
                        name: "标签三",
                        value: "3",
                    },
                    {
                        name: "标签四",
                        value: "4",
                    },
                ]
            },
            {
                groupName: "g2",
                multi: false,
                selected: [],
                lables: [
                    {
                        name: "标签一",
                        value: 1,
                    },
                    {
                        name: "标签二",
                        value: 2,
                    },
                    {
                        name: "标签三",
                        value: 3,
                    },
                    {
                        name: "标签四",
                        value: 4,
                    },
                ]
            }
            ];
    this.state = {
      dataSource: []
    }
    this.columns = columns;
    this.searchColumns = searchColumns;
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.fetchData({}, { current: 1, pageSize: 10 });
  }

  componentDidMount() {
    const data = this.props.data;
    this.setState({
      dataSource: data
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const data = nextProps.data;
      this.setState({
        dataSource: data,
      })
    }
  }

  fetchData(obj, pagination) {
    this.props.dispatch(RequestAction.tableData('/manage/acct/transfer/list', obj, pagination.current - 1, pagination.pageSize))
    let data = {...this.state.dataSource};
    data.loading=true;
    this.setState({
      dataSource:data
    })
  }

  search(selectedData){
    console.log("selectedData",selectedData);
  }

  onSelectChange(selectedRowKeys, selectedRows){
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    console.log("selectedRows changed: ", selectedRows);
  }

  render() {
    const data = { ...this.state.dataSource };
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <div>
        <TableComponent search={this.search} searchColumns={this.searchColumns} rowSelection={rowSelection} columns={this.columns} dataSource={data} fetchData={this.fetchData} />
      </div>
    );
  }
}

Table = connect(mapStateToProps)(Table);

export {
  Table
}