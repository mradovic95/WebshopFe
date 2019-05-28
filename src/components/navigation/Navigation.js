import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import './Navigation.css';
import 'base-64';

class Navigation extends Component {

    constructor() {
        console.log("Navigation constructor");
        super();
    }

    logout = () => {
        alert("You are logged out!");
        localStorage.clear();
        window.location = "/login";
    };

    render() {
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token") === null) {
            return (
                <div className="Navigation">
                    <NavLink className="link" to="/login">Login form</NavLink>
                </div>
            );
        } else {
            return (
                <div className="Navigation">
                    <NavLink className="link" to="/login">Login form</NavLink>
                    {/*<NavLink className="link" to="/admin">Admin panel</NavLink>*/}
                    <NavLink className="link" to="/user">Products</NavLink>
                    <NavLink className="link" to="/shoopingCart">Shooping cart</NavLink>
                    {/*<NavLink className="link" to="/usersList">Users list</NavLink>*/}
                    <button className="link-last" onClick={() => this.logout()}>
                        Logout
                    </button>
                </div>
            );
        }
    }
}

export default Navigation;