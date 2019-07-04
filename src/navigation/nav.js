import React from 'react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        if(localStorage.getItem('userData')) {
            this.setState({redirect: true});
        } else {
            this.setState({redirect: false});
        }
    }

    render() {
 
        const { redirect } = this.state;
        return (
            <header className="app-header">
                <div className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-8">
                                <nav className="nav-navbar">
                                    <ul className="nav navbar-nav navbar-right">
                                        { !redirect ? <li><Link to="/login">Login</Link></li> : null }
                                        { !redirect ? <li><Link to="/signup">Sign Up</Link></li> : null }
                                        { redirect ? <li><Link to="/logout">Logout</Link></li> : null }
                                        <li><Link to="/shop">Shop</Link></li>
                                        <li><Link to="/add-product">Add Product</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Nav;