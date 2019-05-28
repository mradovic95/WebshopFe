import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';

import axios from "axios";

const url = "http://localhost:8084/products/products";

class ProductList extends Component {

    constructor() {
        console.log("Product list constructor");
        super();
        this.state = {
            products: [],
            currentPage: 0,
            pageSize: 5,
            productNumber: 0
        };
        this.update = this.update.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    update() {
        this.setState({state: this.state});
    }

    fetchProducts = (page = 0, size = 5) => {
        const tokenString = "Bearer " + localStorage.getItem("token");
        const headers = {'Authorization': tokenString};
        axios
            .get(url + "?page=" + page + "&size=" + size+"&sort=createdDate,desc", {headers: headers})
            .then(response => {
                const products = response.data.content.map(p => {
                    return {
                        id: p.id,
                        title: p.title,
                        description: p.description,
                        price: p.price
                    };
                });

                const newState = Object.assign({}, this.state, {
                    products: products,
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

    // deleteProduct = (id) => {
    //     const tokenString = "Bearer " + localStorage.getItem("token");
    //     const headers = {'Authorization': tokenString};
    //     axios.delete(url + "/" + id, {headers: headers})
    //         .then(() => this.fetchProducts());
    // };

    addToCart = (product) => {
        let products = localStorage.getItem("products")
        if (products === null) {
            products = [];
        } else {
            products = JSON.parse(products);
        }
        if (this.state.productNumber !== 0) {
            product["number"] = parseInt(this.state.productNumber);
            let flag = 0;
            console.log("Product which we adding to cart" + product);
            products.forEach((product1) => {
                if (product1.id === product.id) {
                    product1.number = product.number + product1.number;
                    console.log("kta" + product1.number);
                    flag = 1;
                }
            });

            if (flag === 0) {
                products.push(product);
            }
            localStorage.setItem("products", JSON.stringify(products));
            console.log("Products after adding element" + products);
        }
        console.log("Number is null");
    };

    handleChange(event) {
        let changes = {};
        changes[event.target.id] = event.target.value;
        const newState = Object.assign({}, this.state, changes);

        this.setState(newState);
    }

    render() {
        return (
            <div className="productList">
                <div>
                    <table class="table table-striped table-bordered table-sm" id="productTable">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                        {/*<th></th>*/}
                        {this.state.products.map(product => <tr className="product">
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                {/*<td>*/}
                                    {/*<button class="btn btn-success" onClick={() => this.deleteProduct(product.id)}>*/}
                                        {/*Delete product*/}
                                    {/*</button>*/}
                                {/*</td>*/}
                                <td>
                                    <div className="form-group row">
                                        <label htmlFor="productNumber" className="col-sm-2 col-form-label">Number</label>
                                        <div className="col-sm-10">
                                            <input className="form-control" id="productNumber" placeholder="Number"
                                                   onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <button className="btn btn-success" onClick={() => this.addToCart(product)}>
                                        Add to cart
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

export default ProductList;