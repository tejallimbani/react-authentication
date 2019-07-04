import React from 'react'
import PostData from '../../services/postdata'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        PostData('login', this.state).then((result) => {
            if(result.data){
                localStorage.setItem('userData', result);
                this.setState({
                    redirect: true
                });
            } else {
                console.log("Login Error");
            }
        });
        e.preventDefault();
    }

    componentWillMount() {
        if(localStorage.getItem('userData')) {
            this.setState({redirect: true});
        }
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={'/dashboard'} />
        }

        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <span className="form-title">Account Login</span>
                    <div className="form-group wrap-input">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={this.state.email}
                            placeholder="Email"
                            onChange={this.handleChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group wrap-input">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group login-btn">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;