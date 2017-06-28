import React, {Component} from 'react';
import {Input, Button, Dropdown} from "antd";
import "./style.less";
const Search = Input.Search;

export default class Operate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropVisible: false,
    };
    this.renderBtn = this.renderBtn.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  renderBtn(type) {
    console.log("type", type);
    const wholeColumns = [...this.props.operateColumns] || [];
    console.log("wholeColumns", wholeColumns);
    let curColumn = [];//当前所有的
    let btnContent = [];//按钮内容
    let columnsShow = [];//显示的按钮
    let columnsHide = [];//隐藏按钮
    wholeColumns.forEach(column => {
      if (column.type === type) {
        curColumn = column.children;
      }
    });
    if (type === "single") {
      columnsShow = curColumn.length > 2 ? curColumn.slice(0, 2) : curColumn;
    } else {
      columnsShow = curColumn.length > 3 ? curColumn.slice(0, 3) : curColumn;
    }
    columnsHide = curColumn.length > columnsShow.length ? curColumn.slice(columnsShow.length) : [];
    if (columnsShow.length > 0) {
      btnContent = columnsShow.map((item, index) => {
        const operateFunc = item.func;
        return (
          <Button
            key={`show${index}`}
            onClick={operateFunc.bind(this)}
            className={type === 'single' && index === 0 ? "btnMl blueBtn" : "btnMl"}
          >
            {item.name}
          </Button>
        )
      });
      if (columnsHide.length > 0) {
        //按钮隐藏内容
        let btnHide = columnsHide.map((item, index) => {
          const operateFunc = item.func
          return (
            <li className="hideBtn" key={`hide${index}`} onClick={operateFunc.bind(this)}>{item.name}</li>
          )
        });
        btnHide = (<ul className="hideBtnCon" key="btnHide">{btnHide}</ul>);
        btnContent.push(
          <Dropdown
            key="drop"
            overlay={btnHide}
            trigger={['click']}

          >
            <Button className="btnMl">下拉</Button>
          </Dropdown>)
      }
    }
    return btnContent;
  }

  render() {
    let linkedButton = this.renderBtn("linked"); //左侧和表格关联按钮
    let singleButton = this.renderBtn("single"); //右侧独立按钮

    return (
      <div className="operateContainer">
        操作框 ：
        <div className="btnContainer">
          <div className="linkedBtn">
            {linkedButton}
          </div>
          <div className="singleBtn">
            {singleButton}
          </div>
        </div>
      </div>
    )
  }
}