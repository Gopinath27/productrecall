import React, {Component} from "react";
import './Login.css';
import Button from '@material-ui/core/Button';
import {  MuiThemeProvider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import user from './user.png';

export default class LoginPage extends Component {
  
    constructor(props){
        super(props);
        this.state={
        username:'',
        password:'',
        loginSuccess: "false"
        }
        //this.handleChange = this.handleChange.bind(this)
        this.onClickLogin = this.onClickLogin.bind(this)
       }
      
    

    usernameChangeHandler = (e) => {
      this.setState({username:e.target.value})
  }

  passwordChangeHandler = (e) => {
    this.setState({password:e.target.value})
  }

    onClickLogin = (e) => {
       const history={useHistory};
        console.log("Inside Onclick login");
        
        var apiBaseUrl = "https://prodrecallrest.azurewebsites.net/";
        
        var payload={
        "userid":'admin',
        "password":'admin'
        }

        console.log(this.state.username);
        console.log(this.state.password);

        axios.get(apiBaseUrl+'login', {
          params:
          {
            "userid" : this.state.username,
            "password": this.state.password
          }
        })
        .then(function (response) {
        console.log(response);
        if(response.data === "Validation Successfull"){
        console.log("Login successfull");
        window.location.href='/login/store';
        }
        else if(response.data === "No User Found"){
        console.log("Username does not exists");
        alert("Username does not exists")
        }
        else if(response.data === "Enter Valid Password"){
          console.log("Username password do not match");
          alert("username password do not match")
          }
        else{
        console.log("Error occurred 404");
        alert("Error occurred 404");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render () {
      const {classes} =this.props; 
      return (
      

        <div className="Login-header">
          <img src={user} className="User-logo" alt="user" />
                <h1>LOGIN</h1>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             placeholder="Username.."
             value={this.state.username}
             onChange = {this.usernameChangeHandler}
             //onChange={this.handleChange}
             />
           <br/><br/>
             <TextField
               type="password"
               placeholder="Password.."
               value={this.state.password}
               onChange = {this.passwordChangeHandler}
               //onChange={this.handleChange}
               />
             <br/> <br/>
             <Button onClick={this.onClickLogin} variant="contained" color="primary">Login</Button>
             </div>
         </MuiThemeProvider>
         </div>
         
        );
    }
}
