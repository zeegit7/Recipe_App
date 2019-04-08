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

        this.state={

            errors : [],
            showErrorMessages:false,
            messageType : "alert alert-light" 
  
          };
 
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

        this.state.errors=[];
        this.setState({messageType:"alert-alert-light"})

        console.log(" In handleAddRecipe")

        console.log("newRecipe",this.newRecipe);

        if(!this.newRecipe.recipe_name || !this.newRecipe.ingredients || !this.newRecipe.instructions  || !this.newRecipe.serving_size
             || !this.newRecipe.category){

            this.state.errors.push("Enter all mandatory fields!");
        }

        if(isNaN(this.newRecipe.serving_size)){

            this.state.errors.push("Enter valid serving size!");

        }

        if(this.state.errors.length>0){
            this.setState({messageType:"alert alert-danger"})
            return
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
                this.state.errors=[];
                this.setState({messageType:"alert alert-light"})
                alert("Recipe add successsful");
                this.props.handleAddRecipe();
            }).catch(err => {
                console.log("Add Recipe server error");
                return err;
                });



        this.resetAddForm();

    }


  render() {

    let errors = this.state.errors.map((error, i)=>{
        return(

            <div className="alert alert-danger" role="alert">
                {error}
            </div>

    )});

    return (
      <div >

        <div className = "container">

            <div className={this.state.messageType}>

                {errors}

            </div>

        </div>

        <br></br>

            <form id="add-recipe-form">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                            <input className = "inp"  name="recipe_name" placeholder ="Enter recipe_name" required = {true} onChange= {(e)=>{this.newRecipe.recipe_name=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input className = "inp" name="ingredients" placeholder ="Enter ingredients" onChange= {(e)=>{this.newRecipe.ingredients=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input className = "inp" name="instructions" placeholder ="Enter instructions" onChange= {(e)=>{this.newRecipe.instructions=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input className = "inp" name="serving_size"  placeholder ="Enter serving_size" required = {true} onChange= {(e)=>{this.newRecipe.serving_size=e.target.value}}/>   
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                            <input className = "inp" name="category"  placeholder ="Enter category" onChange= {(e)=>{this.newRecipe.category=e.target.value}}/>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="col-md-12">
                        <input  className = "inp" name="notes"  placeholder ="Enter notes" onChange= {(e)=>{this.newRecipe.notes=e.target.value}}/>

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