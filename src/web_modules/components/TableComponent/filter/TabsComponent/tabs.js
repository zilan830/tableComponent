import React, {Component} from "react";
import './../style.less';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allWidth: 0,
      left: 0,
      leftMore: false,
      rightMore: false,
      data: {},
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.onClick = this.onClick.bind(this);
  };

  componentDidMount() {
    const width = document.getElementById("tabsWidth").clientWidth;
    let data = this.props.tabData;
    data.options[0].selected = true;
    this.setState({
      allWidth: width,
      data: data,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabData !== this.props.tabData) {
      let data = nextProps.tabData;
      data.options[0].selected = true;
      this.setState({
        data: data,
      })
    }
  }

  handleLeft() {
    const {left, allWidth} = this.state;
    if (left < 0 && allWidth > 618) {
      const newLeft = left + 618;
      this.setState({
        left: newLeft,
      })
    }
  }

  handleRight() {
    const {left, allWidth} = this.state;
    if (allWidth + left > 618) {
      const newLeft = left - 618;
      this.setState({
        left: newLeft,
      })
    }
  }

  onClick(value, groupName) {
    let {data} = this.state;
    let options = [...data.options];
    options.forEach(item => {
      item.selected = false;
    });
    for (let item of options) {
      if (item.value === value) {
        item.selected = true;
      }
    }
    data.options = options;
    this.setState({
      data:data,
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
            key={index}
            onClick={() => this.onClick(item.value, data.groupName)}
            className={item.selected ? "tabItem selected" : "tabItem"}>
            {item.label}
          </li>
        )
      });
    }
    return (
      <div className="tabsContainer">
        {
          allWidth > 618 ?
            <span onClick={this.handleLeft} style={left === 0 ? {"color": "blue"} : {}}> L </span>
            :
            null
        }
        <div className="tabsInnerContainer">
          <ul id="tabsWidth" className="tabsUlContainer" style={{"left": left}}>
            {itemContent}
          </ul>
        </div>
        {
          allWidth > 618 ?
            <span onClick={this.handleRight} style={allWidth + left <= 618 ? {"color": "blue"} : {}}> > </span>
            :
            null
        }
      </div>
    )
  }
}