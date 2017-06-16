import React, { Component } from 'react';
import { Table, Dropdown, message, Icon } from "antd";
import './style.less';

export default class RichTable extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     fromParentProps: {},
        //     loading: false,
        // }
        this.pageOnChange = this.pageOnChange.bind(this);
    }

    componentDidMount() {
        // const fromParentProps = { ...this.props }
        // this.setState({
        //     fromParentProps: fromParentProps
        // })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            if (nextProps.dataSource.error)
                message.error(nextProps.dataSource.data);
        }
    }

    pageOnChange(pagination, filter, sorter) {
        console.log("page", pagination, filter, sorter)
        const fetchData = this.props.fetchData;
        fetchData({}, pagination);

    }

    render() {
        // const { fromParentProps, loading } = this.state;
        // const dataSource = { ...fromParentProps.dataSource };
        // console.log("fromParentProps", fromParentProps)
        const fromParentProps = this.props;
        const dataSource = { ...fromParentProps.dataSource.data }
        const currentState = { ...fromParentProps.dataSource }
        console.log("dataSourcedddddd", dataSource);
        return (
            <div>
                
                <Table
                    {...fromParentProps}
                    columns={fromParentProps.columns}
                    dataSource={dataSource ? dataSource.dataList : []}
                    loading={currentState.loading}
                    onChange={this.pageOnChange}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        total: dataSource.count ? dataSource.count : null
                    }} />
            </div>
        );
    }
}

