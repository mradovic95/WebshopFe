import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShoppingCart.css';
import queryString from 'query-string';

import axios from "axios";

const url = "http://localhost:8084/payment/payment";

class ShoppingCart extends Component {

    constructor() {
        super();
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({state: this.state});
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        if (params.paymentId != null && params.token != null && params.PayerID != null) {
            axios.post(url + "/complete/payment?paymentId=" + params.paymentId + "&token=" + params.token + "&PayerID=" + params.PayerID)
                .then(response => {
                    console.log(response);
                })
        }
    };

    deleteProduct = (id) => {
        let products = (JSON.parse(localStorage.getItem("products")) || []);
        products = products.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(products));
        this.update();
    };

    buy = () => {
        let products = JSON.parse(localStorage.getItem("products"))
            .map((product) => {
                let productDto = {};
                productDto["id"] = product.id;
                productDto["number"] = product.number;
                return productDto;
            });

        const tokenString = "Bearer " + localStorage.getItem("token");
        const headers = {'Authorization': tokenString};

        const paymentRequest = {
            products: products
        };
        let sum = (JSON.parse(localStorage.getItem("products")) || []).map(product =>
            product.number * product.price).reduce((acc, value) => acc = acc + value, 0);
        axios.post(url + "/make/payment?sum=" + sum, paymentRequest, {headers: headers})
            .then(response => {
                window.location = response.data.redirect_url;
            });

    };

    render() {

        console.log("ShoppingCart panel rendering ...");
        return (
            <div className="ShoppingCart">
                <table className="table table-striped table-bordered table-sm">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Number</th>
                    <th>Total price</th>
                    <th></th>
                    {(JSON.parse(localStorage.getItem("products")) || []).map(product =>
                        <tr className="product">
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.number}</td>
                            <td>{product.number * product.price}</td>
                            <td>
                                <button className="btn btn-success" onClick={() => this.deleteProduct(product.id)}>
                                    Delete from cart
                                </button>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>
                            <b>Total price all: {(JSON.parse(localStorage.getItem("products")) || []).map(product =>
                                product.number * product.price).reduce((acc, value) => acc = acc + value, 0)}</b>
                            <div className="form-group row">
                                <div className="col-sm-10">
                                    <button className="btn btn-success" onClick={() => this.buy()}>
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

}

export default ShoppingCart;