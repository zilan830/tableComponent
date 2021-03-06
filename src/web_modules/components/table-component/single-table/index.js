import React, { Component } from 'react';
import { Table, Dropdown, message, Icon, Menu } from "antd";
import './style.less';


export default class RichTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromParentProps: {},
            columnsVisible:false,
            columns: this.props.columns || []
        }
        this.pageOnChange = this.pageOnChange.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.selectColumn = this.selectColumn.bind(this);
        this.renderColumns = this.renderColumns.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            if (nextProps.dataSource.error)
                message.error(nextProps.dataSource.err);
        }
    }

    pageOnChange(pagination, filter, sorter) {
        console.log("page", pagination, filter, sorter)
        const fetchData = this.props.fetchData;
        fetchData({}, pagination);
    }

    //渲染选择栏
    renderMenu() {
        const columns = [...this.state.columns];
        let menu = columns.map((item,index) =>{
            return (
                <li key={index } onClick={this.selectColumn.bind(null,index)}>
                    {item.title}
                    {
                        item.hide ? null : <Icon type="check" />
                    }
                </li>
            )
        });
        return (<ul className="tableDropContainer">{menu}</ul>);
    }

    //选择选择栏
    selectColumn(index){
        let columns = [...this.props.columns];
        for (let [ind, item] of columns.entries()) {
            if(index === ind){
                item.hide = !item.hide;
                break;
            }
        }
        this.setState({
            columns: columns,
        })
    }

    renderColumns() {
        const columns = [...this.state.columns];
        let renderColumns = [];
        for (const item of columns){
            if(!item.hide)
            renderColumns.push(item);
        }
        return renderColumns;
    }

    render() {
        const fromParentProps = this.props;
        const dataSource = { ...fromParentProps.dataSource.data }
        const currentState = { ...fromParentProps.dataSource }
        return (
            <div className="tabelInerContainer">
                <div className="tableDropdown">
                    <Dropdown 
                    overlay={this.renderMenu()} 
                    visible={this.state.columnsVisible}
                    onVisibleChange={visible => {
                    this.setState({ columnsVisible: visible });
                    }}>
                        <div className="tableDrop">
                            <Icon type="ellipsis" />
                        </div>
                    </Dropdown>
                </div>
                <Table
                    {...fromParentProps}
                    columns={this.renderColumns()}
                    dataSource={dataSource ? dataSource.dataList : []}
                    loading={currentState.loading}
                    onChange={this.pageOnChange}
                    rowKey={record => record.id}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        total: dataSource.count ? dataSource.count : null
                    }} />
            </div>
        );
    }
}

