import React from 'react'
import PostData from '../../services/postdata'
import { Redirect } from 'react-router-dom'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false)
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
}

class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: false,
            formErrors: {
                name: '',
                email: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {

        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        // console.log("Name:", name );
        // console.log("Value:", value );

        switch (name) {
            case 'name':
                formErrors.name = 
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case 'email':
                formErrors.email = 
                    emailRegex.test(value) ? "" : "Invalid Email address";
                break;
            case 'password':
                formErrors.password = 
                    value.length < 6 ? "minimum 6 characaters required" : "";
            default:
                break;

        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state) );

        // this.setState({
        //     [e.target.id]: e.target.value
        // });
    }

    handleSubmit(e) {
        e.preventDefault();

        if(formValid(this.state)){
            console.log(`
            --SUBMITTING--
            Name: ${this.state.name}
            Email: ${this.state.email}
            Password: ${this.state.password}
            `);
        } else {
            console.error(`FORM INVALID - DISPLAY ERROR MESSAGE`);
        }

        PostData('register', this.state).then((result) => {
            console.log(result);
        });
    }

    componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            this.setState({redirect: true});
        }
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to={'/'}/>
        }

        const { formErrors } = this.state;

        return (
            <div className="signup-form">
                <h3>Sign up</h3>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className={formErrors.name.length > 0 ? 'error' : null}
                            name="name"
                            id="name"
                            value={this.state.name}
                            noValidate
                            onChange={this.handleChange}
                        />
                        {formErrors.name.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={formErrors.email.length > 0 ? 'error' : null}
                            name="email"
                            id="email"
                            value={this.state.email}
                            noValidate
                            onChange={this.handleChange}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={formErrors.password.length > 0 ? 'error' : null}
                            name="password"
                            id="password"
                            value={this.state.password}
                            noValidate
                            onChange={this.handleChange}
                        />
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Signup" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;