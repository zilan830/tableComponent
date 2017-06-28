import React, {Component} from 'react';
import TableComponent from '../web_modules/components/TableComponent';
import {connect} from "react-redux";
import {RequestAction} from "../web_modules/actions";

const mapStateToProps = (state, oenProps) => {
  console.log("state", state.request)
  return {
    data: state.request,
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
    const searchForm = {
      fields: [
        {
          groupName: 'title',
          topFilter: true,
          type: 'tabs',
          selected: [],
          options: [
            {
              label: "你大大爷的财产",
              value: "money1",
            },
            {
              label: "你二大爷的财产",
              value: "money2",
            },
            {
              label: "你三大爷的财产",
              value: "money3",
            },
            {
              label: "就是没有你的财产",
              value: "money4",
            }
          ]
        },
        {
          groupName: "g1",
          type: "labels",
          multi: true,
          selected: [],
          options: [
            {
              label: "标签一",
              value: "1",
            },
            {
              label: "标签二",
              value: "2",
            },
            {
              label: "标签三",
              value: "3",
            },
            {
              label: "标签四",
              value: "4",
            },
          ]
        },
        {
          groupName: "g2",
          type: "labels",
          multi: false,
          selected: [],
          options: [
            {
              label: "标签一",
              value: 1,
            },
            {
              label: "标签二",
              value: 2,
            },
            {
              label: "标签三",
              value: 3,
            },
            {
              label: "标签四",
              value: 4,
            },
          ]
        },
        {
          groupName: "g3",
          type: "search",
          metas:{
            placeholder: "请输入你大爷的名字",
          },
          selected: [],
        },
        {
          groupName: "g4",
          type: "select",
          metas: {
            placeholder: "请选择你大爷的地址",
          },
          selected: [],
          options: [
            {
              label: "你大大爷地址",
              value: 1,
            },
            {
              label: "你二大爷地址",
              value: 2,
            },
            {
              label: "你三大爷地址",
              value: 3,
            }
          ]
        },
        {
          groupName: "g5",
          type: "cascader",
          selected: [],
          metas:{
            placeholder: "区域选择",
          },
          options:[{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [{
                value: 'xihu',
                label: 'West Lake',
              }],
            }],
          }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
              value: 'nanjing',
              label: 'Nanjing',
              children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              }],
            }],
          }],
        },
        {
          groupName: "g6",
          type: "date",
          selected: [],
          metas: {
            format: "YYYY-MM-DD",
          }
        },
        {
          groupName: "g7",
          topFilter: true,
          type: "search",
          metas:{
            placeholder: "请输入业务单号/客户姓名",
          },
          selected: [],
        },
        {
          groupName: "g8",
          type: "select",
          metas: {
            placeholder: "请选择你想胖揍的人",
          },
          selected: [],
          options: [
            {
              label: "曾小勇1号",
              value: 1,
            },
            {
              label: "曾小勇2号",
              value: 2,
            },
            {
              label: "曾小勇2号",
              value: 3,
            }
          ],
          dependencies: [
            {
              type: "and",
              rules: [
                {
                  fieldName: "customerType.id",
                  type: "regular",
                  value: "^9$"
                }
              ]
            }
          ]
        }
      ]
    };
    const operateColumns = [
      {
        type:"linked",
        children:[
          {
            name: "按钮一",
            func: this.btnOperate1.bind(this),
          },
          {
            name: "按钮二",
            func: this.btnOperate2.bind(this),
          },
          {
            name: "按钮三",
            func: this.btnOperate3.bind(this),
          },
          {
            name: "按钮四",
            func: this.btnOperate4.bind(this),
          },
        ]
      },
      {
        type:"single",
        children:[
          {
            name:"新建",
            func:this.btnOperate1.bind(this),
          },
          {
            name: "按钮二",
            func: this.btnOperate2.bind(this),
          },
          {
            name: "按钮三",
            func: this.btnOperate3.bind(this),
          },
          {
            name: "按钮四",
            func: this.btnOperate4.bind(this),
          },
        ]
      }
    ];
    this.state = {
      dataSource: []
    };
    this.columns = columns;
    this.searchForm = searchForm;
    this.operateColumns = operateColumns;
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.fetchData({}, {current: 1, pageSize: 10});
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

  btnOperate1() {
    console.log("btn1")
  }

  btnOperate2() {
    console.log("btn2")
  }

  btnOperate3() {
    console.log("btn3")
  }

  btnOperate4() {
    console.log("btn4")
  }

  fetchData(obj, pagination) {
    this.props.dispatch(RequestAction.tableData('/manage/acct/transfer/list', obj, pagination.current - 1, pagination.pageSize))
    let data = {...this.state.dataSource};
    data.loading = true;
    this.setState({
      dataSource: data
    })
  }

  search(selectedData) {
    console.log("搜索值", selectedData);
  }

  onSelectChange(selectedRowKeys, selectedRows) {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    console.log("selectedRows changed: ", selectedRows);
  }

  render() {
    const data = {...this.state.dataSource};
    const rowSelection = {
      onChange: this.onSelectChange
    };
    return (
      <div>
        <TableComponent
          dataSource={data}
          search={this.search}
          columns={this.columns}
          fetchData={this.fetchData}
          rowSelection={rowSelection}
          searchForm={this.searchForm}
          operateColumns={this.operateColumns}
        />
      </div>
    );
  }
}

Table = connect(mapStateToProps)(Table);

export {
  Table
}