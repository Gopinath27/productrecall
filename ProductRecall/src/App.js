import React, {Component} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

import WelcomePage from "./pages";
import LoginPage from "./pages/login";
import StorePage from "./pages/store";

class App extends React.Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/login/store" component={StorePage} />
      </Switch>
    </Router>
    
  )
}
}

export default App;