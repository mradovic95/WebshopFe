import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';

import axios from "axios";
import {NavLink} from "react-router-dom";

const url = "http://localhost:8084/users/users/login";

class LoginForm extends Component {

    constructor() {
        console.log("LoginForm constructor");
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    login = () => {
        const tokenRequest = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post(url, tokenRequest)
            .then((tokenResponse) => {
                console.log("Jtw token generated " + tokenResponse.data.token);
                localStorage.setItem("token", tokenResponse.data.token);
                window.location = "/user";
            })
            .catch(() => {
                alert("Invalid user data!!!");
            });
    };

    handleChange = (event) => {
        let changes = {};
        changes[event.target.id] = event.target.value;
        const newState = Object.assign({}, this.state, changes);

        this.setState(newState);
    };

    render() {
        return (
            <div className="LoginForm">
                <div>

                    <input className="form-control-login" id="username" placeholder="username"
                           onChange={this.handleChange}/>
                    <input className="form-control-login" id="password" placeholder="password" ref="password"
                           type="password" onChange={this.handleChange}/>
                    <button className="btn-login" onClick={() => this.login()}>
                        Login
                    </button>

                    <NavLink to="/register">Create account if you dont have one</NavLink>
                </div>
            </div>
        );
    }
}

export default LoginForm;