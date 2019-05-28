import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";

const url = "http://localhost:8084/products/products";

class ProductForm extends Component {

    constructor(props) {
        super();
        this.state = {
            productTitle: "",
            productDescription: "",
            productPrice: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.insertProduct = this.insertProduct.bind(this);
        this.update = this.update.bind(this);
        this.updateParrent = props.updateParrent;
    }

    update() {
        this.setState({state: this.state});
    }

    handleChange(event) {
        let changes = {};
        changes[event.target.id] = event.target.value;
        const newState = Object.assign({}, this.state, changes);

        this.setState(newState);
    }

    insertProduct() {
        const tokenString = "Bearer " + localStorage.getItem("token");
        const headers = {'Authorization': tokenString};
        let productRequest = {
            title: this.state.productTitle,
            description: this.state.productDescription,
            price: this.state.productPrice
        };
        axios.post(url, productRequest, {headers: headers})
            .then(response => {
                console.log(response.data);
                this.updateParrent();
            });
    }

    render() {
        console.log("Product form rendering ...");

        return (
            <div className="productForm">
                <div>

                    <div className="form-group row">
                        <label htmlFor="productTitle" className="col-sm-2 col-form-label">Product title</label>
                        <div className="col-sm-10">
                            <input className="form-control" id="productTitle" placeholder="Product Title"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="productDescription" className="col-sm-2 col-form-label">
                            Product description
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control" id="productDescription"
                                   placeholder="Product description" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="productPrice" className="col-sm-2 col-form-label">Product price</label>
                        <div className="col-sm-10">
                            <input className="form-control" id="productPrice" placeholder="Product price"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button className="btn btn-success" onClick={this.insertProduct}>
                                Insert product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductForm;