import React, { Component } from 'react';
import {Button , Table} from 'react-bootstrap';
import AddRecipe from './AddRecipe';
import '../App.css';

const getRecipeInventoryUrl = 'http://localhost:5000/';

const deleteRecipeUrl = 'http://localhost:5000/';


const headers = {
  'Accept': 'application/json'
};



class Dashboard extends Component {

  constructor(props){

    super(props);

    this.state = {
    
      recipe_inventory: [],
      edit_recipe_inventory:{},
      delete_inventory:{}

    };

  }

  get_recipe_inventory(){

    console.log("get_recipe_inventory called!")


    //api call

    fetch(`${getRecipeInventoryUrl}`, {
      method: 'GET',
      credentials:'include',
      mode: 'cors',
      headers: { ...headers,'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(res => {
          if(res){
            console.log("res", res);
            this.setState({recipe_inventory: res})
          }
          else{
              console.log("no data!")
            }
      }).catch(err => {
          console.log("Server error!!!",err);
          return err;
          });



  }

  componentWillMount(){

    this.get_recipe_inventory();

  }

  handleDeleteRecipe(i){

    console.log("Delete clicked");

    console.log(this.state.recipe_inventory[i].recipe_name)

            //api call
            fetch(`${deleteRecipeUrl}`, {
                method: 'DELETE',
                credentials:'include',
                mode: 'cors',
                headers: { ...headers,'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.recipe_inventory[i])
            })
            .then(res => {
                console.log("res",res);
                console.log("deleteFromInventory Success!!")
                this.get_recipe_inventory();
              }).catch(err => {
                console.log("Server error delete recipe" , err);
                return err;
                });


  }

  handleEditRecipe(i){

    console.log("Edit clicked")
    console.log("Data passed",this.state.recipe_inventory[i]);
    this.props.handleRecipeEdit(this.state.recipe_inventory[i]);
    
  }

  handleAddRecipe(){

    this.get_recipe_inventory();
  
  }


    render() {

      let recipe_inventory = this.state.recipe_inventory.map((inventoryItem, i)=>{
        return(

            <tr key={i}>

            <td>{inventoryItem.recipe_name}</td>

            <td>{inventoryItem.ingredients}</td>

            <td>{inventoryItem.instructions}</td>

            <td>{inventoryItem.serving_size}</td>

            <td>{inventoryItem.category}</td>

            <td>{inventoryItem.notes}</td>

            <td>{inventoryItem.date_added}</td>

            <td>{inventoryItem.date_modified}</td>

            <td><Button bsStyle="primary" onClick={()=>{this.handleEditRecipe(i)}}>Edit</Button></td>

            <td><Button bsStyle="primary" onClick={()=>{this.handleDeleteRecipe(i)}}>Delete</Button></td>

          </tr>

        )});

      return (

        <div>

          <Button bsStyle="primary" data-toggle="modal" data-target="#addRecipeModal">
             Add Recipe
          </Button>

                              <br>
                              </br>

                              
                              <br>
                              </br>

                              <br>
                              </br>


          <div className="modal fade" id="addRecipeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-body">

                                <div>
                                  <AddRecipe handleAddRecipe = {this.handleAddRecipe.bind(this)}/> 
                                </div>

                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                        </div>
            </div>


            <Table className = "table table-striped" striped bordered condensed hover responsive>
                <thead className="thead-dark">
                    <tr>
                    <th>Recipe_Name</th>
                    <th>Ingredients</th>
                    <th>Instructions</th>
                    <th>Serving_Size</th>
                    <th>Category</th>
                    <th>Notes</th>
                    <th>Date_Added</th>
                    <th>Date_Modified</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {recipe_inventory}
                </tbody>
              </Table>
 
        </div>
        
      );
    }
  }
  
  export default Dashboard;