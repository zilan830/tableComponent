import React, {Component} from "react";
import {Icon} from "antd";
import './../style.less';

export default class TabsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWidth: 0,
      left: 0,
      leftMore: false,
      rightMore: false,
      data: {},
      staticLeft: 0,
      staticRight: 0,
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.onClick = this.onClick.bind(this);
  };

  componentDidMount() {
    let data = this.props.tabData;
    data.options[0].selected = true;
    this.setState({
      data: data,
    });
    this.getWidth();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextPropslllll", nextProps);
    if (nextProps.tabData !== this.props.tabData) {
      let data = nextProps.tabData;
      data.options[0].selected = true;
      this.setState({
        data: data,
      });
    }
    this.getWidth();
  }

  getWidth = () => {
    // const width = document.getElementById("tabsWidth").clientWidth;
    console.log("this.button2.getBoundingClientRect()", this.button2.getBoundingClientRect())
    const width = this.button2.clientWidth;
    const left = this.button1.getBoundingClientRect().left;
    const right = this.button1.getBoundingClientRect().right;
    console.log("width", width);
    this.setState({
      allWidth: width,
      staticLeft: left,
      staticRight: right
    });
  };

  handleLeft() {
    const {left, allWidth} = this.state;
    let newLeft = 0;
    if (left < 0 && allWidth > 618) {
      if(allWidth + left >1236){
        newLeft = left + 618;
      }
      this.setState({
        left: newLeft,
      })
    }
  }

  handleRight() {
    const {left, allWidth} = this.state;
    let newLeft = -(allWidth - 618);
    if (allWidth + left > 618) {
      if (allWidth + left > 1236) {
        newLeft = left - 618;
      }
      this.setState({
        left: newLeft,
      })
    }
  }

  onClick(index, value, groupName) {
    let { left, allWidth } = this.state;
    const offsetLeft = document.getElementById(index).getBoundingClientRect().left;
    const offsetRight = document.getElementById(index).getBoundingClientRect().right;
    const width = document.getElementById(index).getBoundingClientRect().width;
    const {staticLeft, staticRight} = this.state;

    if (offsetRight > 660 && allWidth > 618) {
      left = left + offsetLeft - offsetRight;
    }else if (staticLeft > offsetLeft){
      left = left + offsetRight - offsetLeft;
      if(left < width)
        left = 0;
    }

    console.log("offsetLeft", offsetLeft, 'offsetRight', offsetRight, 'width', width)
    const {data} = this.state;
    // let options = [...data.options];
    data.selected = [];
    data.selected.push(value);
    // options.forEach(item => {
    //   item.selected = false;
    // });
    // for (let item of options) {
    //   if (item.value === value) {
    //     item.selected = true;
    //   }
    // }
    // data.options = options;
    this.setState({
      data: data,
      left:left
    });
    this.props.handleTabs(value, groupName, "tabs");
  }


  render() {
    const {left, allWidth, data} = this.state;
    let itemContent = [];
    if (data.hasOwnProperty("options")) {
      itemContent = data.options.map((item, index) => {
        return (
          <li
            id={index}
            key={index}
            onClick={() => this.onClick(index, item.value, data.groupName)}
            className={data.selected[0] === item.value ? "tabItem selected" : "tabItem"}>
            {item.label}
          </li>
        )
      });
    }
    return (
      <div className="tabsContainer">
        {
          allWidth > 618 ?
            <span onClick={this.handleLeft} style={left === 0 ? {"color": "rgba(30,48,84,0.40)"} : {"color":"rgba(30,48,84,0.80)"}}> <Icon type="left" /> </span>
            :
            null
        }
        <div ref={ref => this.button1 = ref} className="tabsInnerContainer">
          <ul id="tabsWidth" ref={ref => this.button2 = ref} className="tabsUlContainer" style={{"left": left}}>
            {itemContent}
          </ul>
        </div>
        {
          allWidth > 618 ?
            <span onClick={this.handleRight} style={allWidth + left <= 618 ? {"color": "rgba(30,48,84,0.40)"} : {"color":"rgba(30,48,84,0.80)"}}><Icon type="right" /></span>
            :
            null
        }
      </div>
    )
  }
}