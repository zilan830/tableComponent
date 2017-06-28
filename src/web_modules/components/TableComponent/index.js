import React, {Component} from 'react';
import RichTable from "./table";
import Filter from "./filter";
import Operate from "./operate";
import './style.less';

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="tableContainer">
        {
          this.props.searchForm ?
            <Filter searchForm={this.props.searchForm} search={this.props.search}/>
            :
            null
        }
        {
          this.props.operateColumns ?
            <Operate operateColumns={this.props.operateColumns || []}/>
            :
            null
        }
        <RichTable {...this.props}/>
      </div>
    );
  }
}