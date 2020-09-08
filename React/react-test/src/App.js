import React from 'react';
import './App.css';
import Nav from './nav';
import Home from './Home';
import Login from './Login';
import User from './User';
import Register from './Register';
import Create from './Create';
import Logout from './Logout';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/create" component={Create}></Route>
          <Route exact path="/logout" component={Logout}></Route>
        </Switch>
      </div>
    </Router>
    
  );
}


export default App;
