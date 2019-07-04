import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentWillMount() {
        if(localStorage.getItem('userData')) {
            localStorage.setItem('userData', '');
            localStorage.setItem('userToken', '');
            localStorage.clear();
            this.setState({redirect: true});
        }
        this.setState({redirect: true});
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={'/login'} />
        }
    }
}

export default Logout;