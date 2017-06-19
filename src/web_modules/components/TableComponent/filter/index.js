import React, { Component } from 'react';
import { Input } from "antd";
import "./style.less";

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUnfolded: false,
            list: []
        }
        this.filter = this.filter.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.passData = this.passData.bind(this);
    }

    componentDidMount() {
        const columns = [...this.props.searchColumns];
        this.setState({
            list: columns,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchColumns !== this.props.searchColumns) {
            const columns = [...nextProps.searchColumns];
            this.setState({
                list: columns,
            })
        }
    }

    filter() {
        const isUnfolded = !this.state.isUnfolded;
        this.setState({
            isUnfolded: isUnfolded,
        })
    }

    passData() {
        const passDataFunc = this.props.search;
        const list = [...this.state.list];
        let selected = [];
        list.forEach(items => {
            let obj = {};
            obj[items.groupName] = items.selected;
            selected.push(obj);
        });
        passDataFunc(selected);
    }

    //选择
    onSelect(groupName, value) {
        const list = [...this.state.list];
        for (const items of list) {
            if (items.groupName === groupName) {
                let selected = new Set(items.selected);
                if (selected.has(value)) {
                    selected.delete(value)
                } else {
                    selected = items.multi ? selected : new Set();
                    selected.add(value);
                }
                items.selected = Array.from(selected);
                break;
            }
        }
        this.setState({
            list: list,
        })
        this.passData();
    }

    //取消选择
    onCancel(groupName, value) {
        const list = [...this.state.list];
        for (const items of list) {
            if (items.groupName === groupName) {
                let selected = new Set(items.selected);
                selected.delete(value);
                items.selected = Array.from(selected);
                break;
            }
        }
        this.setState({
            list: list,
        })
        this.passData();
    }

    render() {
        const selectedContent = this.state.list.map((items, index) => {
            if (items.selected.length > 0) {
                return items.selected.map(item => {
                    return items.lables.map(obj => {
                        if (obj.value === item)
                            return (
                                <span
                                    key={index}
                                    onClick={this.onCancel.bind(null, items.groupName, obj.value)}
                                >
                                    {items.groupName}:{obj.name}
                                </span>
                            )

                    })
                })
            }
        });
        let optionContent = [];
        this.state.list.map((items, index) => {
            let content = [];
            content.push(<li key={items.groupName}>{items.groupName}:</li>);
            items.lables.map((item, index) => {
                content.push(
                    <li
                        key={item.value}
                        onClick={this.onSelect.bind(null, items.groupName, item.value)}
                        style={items.selected.indexOf(item.value) !== -1 ? { "color": "blue" } : {}}>
                        {item.name}
                    </li>
                )
            });
            optionContent.push(<ul>{content}</ul>)
        })
        return (
            <div className="filterContainer">
                <span onClick={this.filter}>
                    筛选
                </span>
                <div className="hasSelectedContainer">
                    已选框:
                    {selectedContent}
                </div>
                <div className="filterInnerContainer" style={this.state.isUnfolded ? { "opacity": 1, "maxHeight": "200px" } : {}}>
                    筛选框:
                    {optionContent}
                </div>

            </div>
        )
    }
}