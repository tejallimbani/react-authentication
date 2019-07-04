import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from '../components/auth/login'
import Signup from '../components/auth/signup'
import Logout from '../components/auth/logout'
import ProductListing from '../components/features/product-listings';
import AddProduct from '../components/features/add-product';

class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/" component="" exact></Route>
                <Route path="/login" component={Login} exact></Route>
                <Route path="/signup" component={Signup} exact></Route>
                <Route path="/logout" component={Logout} exact></Route>
                <Route path="/shop" component={ProductListing} exact></Route>
                <Route path="/add-product" component={AddProduct} exact></Route>
            </Switch>
        );
    }
}

export default Router;