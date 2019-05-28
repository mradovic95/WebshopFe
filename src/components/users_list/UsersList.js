import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersList.css';

import axios from "axios";

const url = "http://localhost:8080/api/users";

class UsersList extends Component {

    constructor() {
        console.log("Users list constructor");
        super();
        this.state = {
            users: [],
            currentPage: 0,
            pageSize: 5,
            productNumber: 0
        };
    }


    fetchProducts = (page = 0, size = 5) => {
        const tokenString = "Bearer " + localStorage.getItem("token");
        const headers = {'Authorization': tokenString};
        axios
            .get(url + "?page=" + page + "&size=" + size+"&sort=id,asc", {headers: headers})
            .then(response => {
                const users = response.data.content.map(u => {
                    return {
                        id: u.id,
                        email: u.email,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        username: u.username,
                        password: u.password,
                        active: u.active,
                        country: u.address.country,
                        city: u.address.city,
                        postcode: u.address.postcode,
                        street: u.address.street,
                        number: u.address.number,
                        apartmentNumber: u.address.apartmentNumber
                    };
                });

                const newState = Object.assign({}, this.state, {
                    users: users,
                    currentPage: page,
                    pageSize: size
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));
    };

    componentDidMount() {
        this.fetchProducts();
    };

    changeUserStatus = (id) => {
        const tokenString = "Bearer " + localStorage.getItem("token");
        const headers = {'Authorization': tokenString};
        axios.put(url + '/' + id + '/change-status', null,{headers: headers})
            .then(() => this.fetchProducts());
    };

    render() {
        console.log("Userss" + JSON.stringify(this.state.users));
        return (
            <div className="usersList">
                <div>
                    <table class="table table-striped table-bordered table-sm" id="productTable">
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Active</th>
                        {this.state.users.map(user => <tr className="users">
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.active.toString()}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => this.changeUserStatus(user.id)}>
                                        Change user status
                                    </button>
                                </td>
                            </tr>
                        )}
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <button className="btn btn-success" onClick={() => {
                                    console.log("Previous");
                                    if (this.state.currentPage !== 0) {
                                        this.fetchProducts(this.state.currentPage - 1)
                                    }
                                }}>
                                    Previous
                                </button>
                            </li>
                            <button className="btn btn-success" onClick={() => {
                                console.log("Next");
                                this.fetchProducts(this.state.currentPage + 1);
                            }}>>
                                Next
                            </button>
                            <li className="page-item">
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default UsersList;