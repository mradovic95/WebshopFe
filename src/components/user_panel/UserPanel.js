import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../product_list/ProductList';

class UserPanel extends Component {

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
            </div>
        );
    }

}

export default UserPanel;