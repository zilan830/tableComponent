import { DatePicker } from "antd";
import React, { Component } from "react";

export default class DateFilter extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>
                <DatePicker
                    placeholder="开始日期"
                    style={{marginRight:10}}
                />
                <DatePicker
                    placeholder="结束日期"
                />
            </div>
        )
    }
}