import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterForm.css';

import axios from "axios";

const url = "http://localhost:8084/users/users";

class RegisterForm extends Component {

    constructor() {
        console.log("Register form constructor");
        super();
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            postcode: "",
            street: "",
            number: "",
            apartmentNumber: ""
        }
    }

    register = () => {

        const registrationRequest = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            active: true,
            role: {
                name: "ROLE_USER"
            },
            address: {
                country: this.state.country,
                city: this.state.city,
                postcode: this.state.postcode,
                street: this.state.street,
                number: this.state.number,
                apartmentNumber: this.state.apartmentNumber
            }
        };

        axios.post(url, registrationRequest)
            .then((tokenResponse) => {
                console.log("Register" + tokenResponse.data);
                alert("You are successfully! Go to login page and enter username and password!");
                window.location = "/login";
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
            <div className="RegisterForm">
                <div>
                    <input className="form-control-register" id="firstName" placeholder="First name"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="lastName" placeholder="Last name"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="username" placeholder="username"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="email" placeholder="email"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="password" type="password" placeholder="password"
                           ref="password" onChange={this.handleChange}/>
                    <input className="form-control-register" id="confirmPassword" type="password"
                           placeholder="confirm password" onChange={this.handleChange}/>
                    <input className="form-control-register" id="country" placeholder="Country"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="city" placeholder="City"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="postcode" placeholder="Postcode"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="street" placeholder="Street"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="number" placeholder="Number"
                           onChange={this.handleChange}/>
                    <input className="form-control-register" id="apartmentNumber" placeholder="Apartment number"
                           onChange={this.handleChange}/>
                    <button className="btn-register btn-success" onClick={() => this.register()}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
}

export default RegisterForm;