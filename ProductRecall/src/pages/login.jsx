import React from "react";
import './Login.css';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import { MdAccountCircle } from "react-icons/md";
import axios from 'axios';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginSuccess: "false"
        }
        
        this.onClickLogin = this.onClickLogin.bind(this)
    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    onClickLogin = (e) => {

        if (this.state.username != '' && this.state.password != '' && this.state.username != null && this.state.password != null) {
            console.log("Inside Onclick login");
            var apiBaseUrl = "https://prodrecallrest.azurewebsites.net/";

            var payload = {
                "userid": '',
                "password": ''
            }
            console.log(this.state.username);
            console.log(this.state.password);

            axios.get(apiBaseUrl + 'login', {
                params:
                {
                    "userid": this.state.username,
                    "password": this.state.password
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data === "Validation Successfull") {
                        console.log("Login successfull");
                        window.location.href = '/login/store';
                    }
                    else if (response.data === "No User Found") {
                        console.log("Username does not exists");
                        alert("Username does not exists")
                    }
                    else if (response.data === "Enter Valid Password") {
                        console.log("Enter Valid Password");
                        alert("Username & Password do not match!! Enter valid Password")
                    }
                    else {
                        console.log("Error occurred 404");
                        alert("Error occurred 404");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {

            if ((this.state.username == '' || this.state.username == null) && (this.state.password == '' || this.state.password == null)) {
                alert("Please enter the username and password")
            }

            else if (this.state.username == '' || this.state.username == null) {
                alert("Please enter the username")
            }

            else if (this.state.password == '' || this.state.password == null) {
                alert("Please enter the password")
            }
        }

    }

    render() {
        const { classes } = this.props;
        return (
            <div className="Login-header">
                <MuiThemeProvider>
                    <div>
                        <MdAccountCircle size="3em" style={{ display: "flex", margin: "auto" }} /><br />
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.usernameChangeHandler}
                        />
                        <br /><br />
                        <TextField
                            type="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.passwordChangeHandler}
                        />
                        <br /><br />
                        <Button onClick={this.onClickLogin} variant="contained" color="primary" style={{ display: "flex", margin: "auto" }}>Login</Button>
                        <br /><br /><br /><br />

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
