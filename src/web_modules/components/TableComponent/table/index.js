import React, { Component } from 'react';
import { Table, Dropdown, Button, Icon, Row, Col } from "antd";
import './style.less';

export default class RichTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromParentProps: {},
            loading: false,
        }
        this.pageOnChange = this.pageOnChange.bind(this);
    }

    componentDidMount() {
        const fromParentProps = { ...this.props }
        this.setState({
            fromParentProps: fromParentProps
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            const fromParentProps = { ...nextProps }
            console.log("fromParentPropspppppp", fromParentProps)
            this.setState({
                fromParentProps: fromParentProps
            })
        }
    }

    pageOnChange(pagination, filter, sorter) {
        console.log("page", pagination, filter, sorter)

    }

    render() {
        const { fromParentProps, loading } = this.state;
        const dataSource = { ...fromParentProps.dataSource };
        console.log("fromParentProps", fromParentProps)
        return (
            <div>
                <Table
                    {...fromParentProps}
                    columns={fromParentProps.columns}
                    dataSource={dataSource ? dataSource.dataList : []}
                    loading={loading}
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

