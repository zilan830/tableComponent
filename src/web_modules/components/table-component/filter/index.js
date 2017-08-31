import React, {Component} from 'react';
import moment from 'moment';
import {Input, Button, DatePicker, Select, Cascader, Tag} from "antd";
import TabContainer from './tabsComponent';
import "./style.less";
const Search = Input.Search;
const {RangePicker} = DatePicker;
const {Option} = Select;

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUnfolded: true,//是否展开
      list: {}
    };
    this.filter = this.filter.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.passData = this.passData.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.hasSelectedContent = this.hasSelectedContent.bind(this);
    this.selectContent = this.selectContent.bind(this);
  }

  componentDidMount() {
    const searchForm = {...this.props.searchForm};
    this.setState({
      list: searchForm,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchForm !== this.props.searchForm) {
      const searchForm = {...nextProps.searchForm};
      this.setState({
        list: searchForm,
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
    const list = {...this.state.list};
    const passDataFunc = this.props.search;
    const listForm = [...list.fields];
    let selected = [];
    //把数值封装好传出去
    listForm.forEach(items => {
      let obj = {};
      obj[items.groupName] = items.selected;
      selected.push(obj);
    });
    passDataFunc(selected);
  }

  //时间处理
  handleDate(value, dateString, groupName) {
    const list = {...this.state.list};
    const listForm = list.fields;
    for (const items of listForm) {
      if (items.groupName === groupName) {
        items.selected = dateString;
        break;
      }
    }
    this.setState({
      list: list,
    });
    this.passData();
  }

  //选择
  onSelect(value, groupName, type) {
    const list = {...this.state.list};
    const listForm = list.fields;
    for (const items of listForm) {
      if (items.groupName === groupName) {
        switch (type) {
          case "cascader":
            items.selected = value;
            break;
          case "tabs":
            items.selected = [];
            items.selected.push(value);
            break;
          default:
            if (items.options) {
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
        break;
      }
    }
    this.setState({
      list: list,
    });
    this.passData();
  }

  //取消选择
  onCancel(value, groupName, type) {
    const list = {...this.state.list};
    const listForm = list.fields;
    for (const items of listForm) {
      if (items.groupName === groupName) {
        switch (type) {
          case "cascader":
            items.selected = [];
            break;
          case "date":
            items.selected = ["", "", []];
            break;
          default:
            let selected = new Set(items.selected);
            selected.delete(value);
            items.selected = Array.from(selected);
            break;
        }
        break;
      }
    }
    this.setState({
      list: list,
    });
    this.passData();
  }

  //以选择内容框
  hasSelectedContent(list, listForm) {
    //已选择内容框
    const selectedContent = listForm.map((items, index) => {
      //有选择内容再继续
      if (items.selected.length > 0 && items.type !== "tabs") {
        let selected = items.selected;
        switch (items.type) {
          case "cascader":
            return (
              <span
                key={index}
                className="hasSelected"
                onClick={this.onCancel.bind(null, items.selected, items.groupName, items.type)}
              >
                    {items.groupName}:{items.selected.join("/")}
              </span>
            );
            break;
          case "date":
            if (selected[0].indexOf("-") !== -1)
              return (
                <span
                  key={index}
                  className="hasSelected"
                  onClick={this.onCancel.bind(null, items.selected, items.groupName, items.type)}
                >
                  <Tag closable>{items.groupName}:{selected.join("/")}</Tag>
                </span>
              );
            break;
          case "search":
            if (selected[0] !== "" && !items.topFilter)
              return (
                <span
                  key={index}
                  className="hasSelected"
                  onClick={this.onCancel.bind(null, items.selected, items.groupName, items.type)}
                >
                    {items.groupName}:{selected[0]}
              </span>
              );
            break;
          default:
            return items.selected.map(item => {
              if (items.options) {
                return items.options.map(obj => {
                  if (obj.value === item)
                    return (
                      <span
                        key={index}
                        className="hasSelected"
                        onClick={this.onCancel.bind(null, obj.value, items.groupName, items.type)}
                      >sle
                        <Tag className="tag" closable>
                      {items.groupName}:{obj.label}
                        </Tag>
                      </span>
                    )
                })
              }
            });
            break;
        }
      }
    });
    return selectedContent;
  }

  //可选择内容
  selectContent(list, listForm) {
    let optionContent = [];
    let tabData = {};
    let searchData = {};
    //遍历表单，根据类型返回
    listForm.map((items, index) => {
      let content = [];
      let nameContent = [];
      if (items.topFilter) {
        switch (items.type) {
          case "tabs":
            tabData = items;
            break;
          case "search":
            searchData = {...items.metas};
            searchData.name = items.groupName;
            break;
        }
      } else {
        const name = items.groupName;
        const type = items.type;
        nameContent.push(<div key={name} className="filterName">{name}:</div>);
        switch (type) {
          case "labels":
            items.options.map((item, index) => {
              content.push(
                <li
                  className={items.selected.includes(item.value) ? "filterLabel active" : "filterLabel"}
                  key={`${type}-${index}`}
                  onClick={() => this.onSelect(item.value, name, type)}>
                  {item.label}
                </li>
              )
            });
            break;
          case "search":
            content.push(
              <li
                key={`${type}-${index}`}>
                <Search
                  style={{width: 200, height: 28}}
                  {...items.metas}
                  onSearch={(value) => this.onSelect(value, name, type)}
                />
              </li>
            );
            break;
          case "select":
            let optionsContent = [];
            items.options.map((item, index) => {
              optionsContent.push(
                <Option
                  disabled={item.disabled}
                  key={`${name}${index}`}
                  value={item.value}>
                  {item.label}
                </Option>
              )
            });
            content.push(
              <li key={`${type}-${index}`}>
                <Select
                  allowClear={true}
                  style={{minWidth: 200}}
                  {...items.metas}
                  value={items.selected}
                  onChange={(value) => this.onSelect(value, name, type)}>
                  {optionsContent}
                </Select>
              </li>
            );
            break;
          case "cascader":
            content.push(
              <li key={`${type}-${index}`}>
                <Cascader
                  {...items.metas}
                  value={items.selected}
                  options={items.options}
                  onChange={(value) => this.onSelect(value, name, type)}/>
              </li>
            );
            break;
          case "date":
            const selected = items.selected;
            const selectedFirst = selected[0] || "";
            items.options.map((item, index) => {
              content.push(
                <li
                  className={items.selected.includes(item.value) ? "filterLabel active" : "filterLabel"}
                  key={`${type}-${index}`}
                  onClick={() => this.onSelect(item.value, name, type)}>
                  {item.label}
                </li>
              )
            });
            content.push(
              <li
                key={`${type}-${index}`}>
                <RangePicker
                  {...items.metas}
                  value={selectedFirst.indexOf("-") !== -1 ? [moment(items.selected[0]), moment(items.selected[1])] : []}
                  onChange={(value, dateString) => {
                    this.handleDate(value, dateString, name)
                  }}/>
              </li>
            );
            break;
        }
        optionContent.push(
          <div className="filterConditionsCon">
            {nameContent}
            <ul key={`opt${index}`}>{content}</ul>
          </div>
        )
      }
    });
    const wholeContent = {
      optionContent,
      tabData,
      searchData
    };
    return wholeContent;
  }

  render() {
    const list = {...this.state.list};
    const listForm = list.fields || [];
    const hasSelectedContent = this.hasSelectedContent(list, listForm);
    const {optionContent, tabData, searchData} = this.selectContent(list, listForm);
    const topContent = <TabContainer tabData={tabData} handleTabs={this.onSelect} searchData={searchData}
                                     onSearch={this.onSelect}/>;
    return (
      <div className="filterContainer">
        {topContent}
        <div className="filterDet">
          <Button className="filterBtn" onClick={this.filter}>
            筛选
          </Button>
          <div
            className="filterInnerContainer"
            style={this.state.isUnfolded ? {"opacity": 1, "maxHeight": "1200px"} : {}}>
            {optionContent}
          </div>
          <div className="hasSelectedContainer"
               style={this.state.isUnfolded ? {} : {"opacity": 1, "minHeight": "60px"}}>
            已选框:
            {hasSelectedContent}
          </div>
        </div>
      </div>
    )
  }
}