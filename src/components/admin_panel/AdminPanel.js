import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../product_list/ProductList';
import ProductForm from '../product_form/ProductForm';

class AdminPanel extends Component {

    constructor() {
        super();
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({state: this.state});
    }

    render() {

        console.log("Admin panel rendering ...");
        return (
            <div className="AdminPanel">
                <ProductList/>
                <ProductForm updateParrent={this.update}/>
            </div>
        );
    }

}

export default AdminPanel;