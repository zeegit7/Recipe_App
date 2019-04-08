import React, { Component } from 'react';
import {Route, Router, Switch } from 'react-router-dom';
import {history} from './utils/utils';
import Error from './components/Error';
import Dashboard from './components/Dashboard';
import EditRecipe from './components/EditRecipe';
import './App.css';

class App extends Component {

  constructor(props){

    super(props);

    this.state = {

      editRecipeData:{}

    };

  }

  handleRecipeEdit(editData){

    console.log("Edit data" ,editData);
    this.state.editRecipeData = editData;
    history.push("/editRecipe");
  
  }


  render() {
    return (

      <Router history={history}>
      
      
        <div className="App">

          <Switch>

            <Route  exact path="/" component ={() => (<Dashboard handleRecipeEdit={this.handleRecipeEdit.bind(this)}/>)}/>
            <Route  exact path="/editRecipe" component ={() => (<EditRecipe editRecipeData={this.state.editRecipeData}/>)}/> 
            <Route component={Error} />

          </Switch>

        </div>


      </Router>
    );
  }
}

export default App;
