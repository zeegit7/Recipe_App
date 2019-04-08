import React, { Component } from 'react';
import {history} from '../utils/utils';
import {Button} from 'react-bootstrap';
import '../App.css';

const headers = {
    'Accept': 'application/json'
};

const editRecipeUrl = 'http://localhost:5000/';


class EditRecipe extends Component {

    constructor(props){

        super(props);

        this.editRecipeData = {
            
            "recipe_name":this.props.editRecipeData.recipe_name,
            "ingredients":"",
            "instructions":"",
            "serving_size":"",
            "category":"",
            "notes":"" 

        };

    }


    handleEditRecipe(e){

        console.log("handleEditRecipe");

        if(!this.editRecipeData.ingredients){
            this.editRecipeData.ingredients = this.props.editRecipeData.ingredients;
        }

        if(!this.editRecipeData.instructions){
            this.editRecipeData.instructions = this.props.editRecipeData.instructions;
        }

        if(!this.editRecipeData.serving_size){
            this.editRecipeData.serving_size = this.props.editRecipeData.serving_size;
        }

        if(!this.editRecipeData.category){
            this.editRecipeData.category = this.props.editRecipeData.category;
        }

        if(!this.editRecipeData.notes){
            this.editRecipeData.notes = this.props.editRecipeData.notes;
        }


        console.log("editRecipeData",this.editRecipeData);

        //api call
        fetch(`${editRecipeUrl}`, {
            method: 'PUT',
            credentials:'include',
            mode: 'cors',
            headers: { ...headers,'Content-Type': 'application/json' },
            body: JSON.stringify(this.editRecipeData)
        })
        .then(res => {
                console.log("Edit Recipe Success!!")
                history.push("/");
            }).catch(err => {
                console.log("Server error Edit Recipe!!!");
                return err;
                });


    }

    handleCancelEditRecipe(e){

        console.log("handleCancelEditRecipe");

        history.push("/");


    }


  render() {
    return (
      <div>

        <form>
            <label>
                <h1 className="text-muted">Edit {this.props.editRecipeData.recipe_name}</h1>
                <br></br>
                <input type="text" name="title"
                    readOnly
                    value = {this.props.editRecipeData.recipe_name}
                />

                <br></br>
                <br></br>

                <input type="text" name="genre"
                    onChange= {(e)=>{this.editRecipeData.ingredients=e.target.value}}
                    defaultValue = {this.props.editRecipeData.ingredients}
                />

                <br></br>
                <br></br>

                <input type="text" name="year"
                    onChange= {(e)=>{this.editRecipeData.instructions=e.target.value}}
                    defaultValue = {this.props.editRecipeData.instructions}
                />

                <br></br>
                <br></br>

                <input type="text" name="studio"
                    onChange= {(e)=>{this.editRecipeData.serving_size=e.target.value}}
                    defaultValue = {this.props.editRecipeData.serving_size}
                />

                <br></br>
                <br></br>

                <input type="text" name="synopsis"
                    onChange= {(e)=>{this.editRecipeData.category=e.target.value}}
                    defaultValue = {this.props.editRecipeData.category}
                />

                <br></br>
                <br></br>


                <input type="text" name="actors"
                    onChange= {(e)=>{this.editRecipeData.notes=e.target.value}}
                    defaultValue = {this.props.editRecipeData.notes}
                />

                <br></br>
                <br></br>

              

            </label>
            <br></br>

            <br></br>

            <Button bsStyle="primary" onClick={()=> {this.handleEditRecipe()}}>
                Edit
            </Button>

            <Button bsStyle="primary" onClick={()=> {this.handleCancelEditRecipe()}}>
                Cancel
            </Button>

        </form>

      </div>
    );
  }
}

export default EditRecipe;