import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './App';
import { Table } from './table';


ReactDOM.render( 
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="table" component={Table} />
      <IndexRedirect to="table" />
    </Route>
   </Router>
, document.getElementById('container'));
