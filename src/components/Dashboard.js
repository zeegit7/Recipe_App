import React, { Component } from 'react';
import {Button , Table} from 'react-bootstrap';
import '../App.css';

const headers = {
  'Accept': 'application/json'
};



class Dashboard extends Component {

  constructor(props){

    super(props);

    this.state = {
    
      recipe_inventory: [],
      edit_recipe_inventory:{}

    };

  }

  get_recipe_inventory(){

    console.log("get_recipe_inventory called!")


    this.setState({recipe_inventory:      
      [
        {
          "recipe_name":"abc",
          "ingredients":"abc",
          "instructions":"abc",
          "serving_size":"abc",
          "category":"abc",
          "notes":"abc",
          "date_added":"abc",
          "date_modified":"abc"

        }
      ]
    });

    console.log(this.state.recipe_inventory);

    //api call

    // fetch(`${getRecipeInventoryUrl}`, {
    //   method: 'GET',
    //   credentials:'include',
    //   mode: 'cors',
    //   headers: { ...headers,'Content-Type': 'application/json'}
    // }).then(res => res.json())
    //   .then(res => {
    //       if(res){
    //         console.log("res", res);
    //         this.setState({recipe_inventory: res})
    //       }
    //       else{
    //           console.log("no data!")
    //         }
    //   }).catch(err => {
    //       console.log("Server error!!!",err);
    //       return err;
    //       });



  }

  componentWillMount(){

    this.get_recipe_inventory();

  }

  handleDeleteRecipe(){

    console.log("Delete!");

  }

  handleEditRecipe(i){

    console.log("Edit clicked")
    console.log("Data passed",this.state.recipe_inventory[i]);
    this.props.handleRecipeEdit(this.state.recipe_inventory[i]);
    
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