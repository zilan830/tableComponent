import React, { Component } from 'react';
import { Input, Button, Dropdown } from "antd";
import "./style.less";
const Search = Input.Search;

export default class Operate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropVisible:false,
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const columns = [...this.props.operateColumns] || [];
        let btncontent = []; //按钮内容
        let searchContent = []; //搜索内容
        if (columns.length > 0){
            //将按钮组分成两部分，可视的和下拉组
            const columnsShow = columns[0].length > 3 ? columns[0].slice(0,3) : columns[0];
            //先将显示的内容放进去
            btncontent = columnsShow.map((item, index) => {
                const operateFunc = item.func
                return (
                    <Button
                        key={`show${index}`}
                        onClick={operateFunc.bind(this)}
                        className="btnMl"
                    >
                        {item.name}
                    </Button>
                )
            });
            if(columns[0].length > 3 ){
                const columnsHide = columns[0].slice(3);
                //按钮隐藏内容
                let btnHide = columnsHide.map((item, index) => {
                    const operateFunc = item.func
                    return (
                        <li className="hideBtn" key={`hide${index}`} onClick={operateFunc.bind(this)}>{item.name}</li>
                    )
                }) 
                btnHide = (<ul className="hideBtnCon" key="btnHide">{btnHide}</ul>);
                btncontent.push(
                <Dropdown 
                key="drop" 
                overlay={btnHide}
                trigger={['click']}
                visible={this.state.dropVisible}
                onVisibleChange={visible => {
                    this.setState({ dropVisible: visible });
                  }}
                >
                <Button className="btnMl">下拉</Button>
                </Dropdown>)
            }
        }
        if (columns.length > 1)
            searchContent = columns[1].map((item, index) => {
                const operateFunc = item.func;
                return (
                    <Search key={index} placeholder={item.placeholder} style={{ width: 200, height: 20 }} onSearch={operateFunc.bind(this)} />
                )
            })
        return (
            <div className="operateContainer">
                操作框 ：
              <div className="btnContainer">
                    {btncontent}
                </div>
                <div className="searchContainer">
                    {searchContent}
                </div>
            </div>
        )
    }
}