import React from 'react'
import { Redirect, Link } from 'react-router-dom'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }

    componentWillMount() {
        if(!sessionStorage.getItem('userData')) {
            this.setState({redirect: true});
        }
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={'/login'} />
        }

        return(
            <div>
                <Link to="/logout">Logout</Link>
                <div className="main-sidebar">
                    <div className="main-navbar">
                        <div className="nav-wrapper">
                            <ul className="nav--no-borders flex-column nav">
                                <li className="nav-item">
                                    <button className="item-btn">
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons"></i>
                                        </div>
                                        <span>Dashboard</span>
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="item-btn">
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons"></i>
                                        </div>
                                        <span>Add Product</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                
                </div>
            </div>
        );
    }
}

export default Dashboard;