import React, { Component } from 'react';
import {Route, Router, Switch } from 'react-router-dom';
import {history} from './utils/utils';
import Error from './components/Error';
import Dashboard from './components/Dashboard';
import EditRecipe from './components/EditRecipe';
import './App.css';

class App extends Component {
  render() {
    return (

      <Router history={history}>
      
      
        <div className="App">

          <Switch>

            <Route  exact path="/" component ={() => (<Dashboard/>)}/>
            <Route  exact path="/editRecipe" component ={() => (<EditRecipe/>)}/> 
            <Route component={Error} />

          </Switch>

        </div>


      </Router>
    );
  }
}

export default App;
