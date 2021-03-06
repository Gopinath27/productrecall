import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import WelcomePage from "./pages";
import LoginPage from "./pages/login";
import StorePage from "./pages/store";
import ProductDetailsPage from "./pages/product";
import ProductRecallPage from "./pages/productrecall";


class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login/store" component={StorePage} />
          <Route exact path="/login/product" component={ProductDetailsPage} />
          <Route exact path="/login/productrecall" component={ProductRecallPage} />
        </Switch>
      </Router>

    )
  }
}

export default App;