import React, { Component } from 'react';
import '../App.css'
import {Button} from 'react-bootstrap';

const headers = {
    'Accept': 'application/json'
};

const addRecipeUrl = 'http://localhost:5000/';


class AddRecipe extends Component {

    constructor(){

        super();
 
        this.newRecipe = {

            "recipe_name":"",
            "ingredients":"",
            "instructions":"",
            "serving_size":"",
            "category":"",
            "notes":""

        };

    }

    resetAddForm(){

        document.getElementById("add-recipe-form").reset();

    }



    handleAddRecipe(e){

        console.log(" In handleAddRecipe")

        console.log("newRecipe",this.newRecipe);

        if(!this.newRecipe.recipe_name || !this.newRecipe.ingredients || !this.newRecipe.instructions  || !this.newRecipe.serving_size
             || !this.newRecipe.category || !this.newRecipe.notes ){

            console.log("All fields are mandatory!");
        }

        if(this.newRecipe.serving_size == NaN){
            console.log("Serving size must be number!")
        }

            //api call
        fetch(`${addRecipeUrl}`, {
            method: 'POST',
            credentials:'include',
            mode: 'cors',
            headers: { ...headers,'Content-Type': 'application/json' },
            body: JSON.stringify(this.newRecipe)
        })
        .then(res => {
            console.log("res",res)
                console.log("Add Recipe Success!!")
                alert("Recipe add successsful");
                this.props.handleAddRecipe();
            }).catch(err => {
                console.log("Add Recipe server error");
                return err;
                });



        this.resetAddForm();

    }


  render() {

    return (
      <div >

            <form id="add-recipe-form">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                            <input  name="recipe_name" placeholder ="Enter recipe_name" required = {true} onChange= {(e)=>{this.newRecipe.recipe_name=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input name="ingredients" placeholder ="Enter ingredients" onChange= {(e)=>{this.newRecipe.ingredients=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input name="instructions" placeholder ="Enter instructions" onChange= {(e)=>{this.newRecipe.instructions=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input name="serving_size"  placeholder ="Enter serving_size" required = {true} onChange= {(e)=>{this.newRecipe.serving_size=e.target.value}}/>   
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input name="category"  placeholder ="Enter category" onChange= {(e)=>{this.newRecipe.category=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                        <input name="notes"  placeholder ="Enter notes" onChange= {(e)=>{this.newRecipe.notes=e.target.value}}/>

                        </div>
                        <br></br>
                        <br></br>
                        
                            
                      </div>

                      <br></br>
                      
                            <Button bsStyle="primary" onClick={()=> {this.handleAddRecipe()}}>
                                Add
                            </Button>

                    </div>
              
            </form>


            
      </div>
    );
  }
}

export default AddRecipe;