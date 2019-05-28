import React, {Component} from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from './components/login_form/LoginForm';
import AdminPanel from './components/admin_panel/AdminPanel';
import UserPanel from './components/user_panel/UserPanel';
import Navigation from './components/navigation/Navigation';
import RegisterForm from './components/register_form/RegisterForm';
import ShoopingCart from './components/shopping_cart/ShoppingCart';
import UsersList from './components/users_list/UsersList';

class App extends Component {

    render() {
        console.log("App rendering ...");
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/admin" component={AdminPanel}/>
                        <Route path="/user" component={UserPanel}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/shoopingCart" component={ShoopingCart}/>
                        <Route path="/usersList" component={UsersList}/>
                    </switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default App;