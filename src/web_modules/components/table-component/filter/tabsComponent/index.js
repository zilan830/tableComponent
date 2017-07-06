import React, {Component} from 'react';
import {Input} from "antd";
import TabsFilter from './TabsFilter';
import "../style.less";
const Search = Input.Search;

export default ({tabData,searchData,handleTabs,onSearch}) => {
  if (tabData.hasOwnProperty("options") || searchData.hasOwnProperty("placeholder")) {
    return (
      <div className="filterTabsContainer">
        {
          tabData.hasOwnProperty("options") ?
            <TabsFilter tabData={tabData} handleTabs={handleTabs}/>
            :
            null
        }
        {
          searchData.hasOwnProperty("placeholder") ?
            <div className="tabSearchContainer">
              <Search {...searchData} onSearch={(value) => onSearch(value, searchData.name, 'search')}/>
            </div>
            :
            null
        }
      </div>
    );
  } else {
    return null;
  }

};