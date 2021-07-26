import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import FavPage from './components/FavPage';
import Header from './components/Header';
export class App extends Component {
  render() {
    return (
      <>
      <Header/>
         <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/Fav">
            <FavPage />
          </Route>
        </Switch>
      
    </Router>
      </>
    )
  }
}

export default App
