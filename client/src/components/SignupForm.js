import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../styles/bootstrapValidator.css';
import '../lib/bootstrapValidator';
import CheckBox from './Basic/CheckBox';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { userName: "", password: "", confirmPassword: "", error: "" };
        this.onSignup = this.onSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        $("#signupForm").bootstrapValidator({
            message: 'This value is not valid',
            fields: {
                userName: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and can\'t be empty'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: 'The password and its confirm are not the same'
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: 'The confirm password is required and can\'t be empty'
                        },
                        identical: {
                            field: 'password',
                            message: 'The password and its confirm are not the same'
                        }
                    }
                }
            }
        });
    }
    onSignup(e) {
        e.preventDefault();
        if (this.state.acceptTerm) {
            this.props.onSignup(this.state.userName, this.state.password);
            this.clearData();
        }
        else
            alert('Please check "I accept" before registering.');
    }

    clearData() {
        this.setState({ userName: "", password: "", confirmPassword: "", error: "" });
    }

    handleChange(event) {
        debugger;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form role="form" onSubmit={this.onSignup} id="signupForm">
                <div className="form-group has-feedback lg left-feedback no-label">
                    <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} className="form-control no-border input-lg rounded" placeholder="Choose username" />
                    <span className="fa fa-user form-control-feedback" />
                </div>
                <div className="form-group has-feedback lg left-feedback no-label">
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} className="form-control no-border input-lg rounded" placeholder="Enter password" />
                    <span className="fa fa-lock form-control-feedback" />
                </div>
                <div className="form-group has-feedback lg left-feedback no-label">
                    <input type="password" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} className="form-control no-border input-lg rounded" placeholder="re-enter password" />
                    <span className="fa fa-unlock form-control-feedback" />
                </div>
                <div className="form-group">
                    <div className="checkbox">
                        <label className="inline-popups">
                            <CheckBox name="acceptTerm" onChange={this.handleChange} className="i-yellow-flat" /> I accept <a href="#text-popup" data-effect="mfp-zoom-in">Terms and conditions</a>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={this.onSignup} className="btn btn-warning btn-lg btn-perspective btn-block">REGISTER</button>
                </div>
            </form>
        );
    }
}
SignupForm.propTypes = {
    onSignup: PropTypes.func,
    onCancel: PropTypes.func,
    setUser: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignup: (userName, password) => dispatch({ type: 'SIGNUP_USER', userName, password }),
        setUser: (userName, isLoggedIn) => dispatch({ type: "SET_USER", userName, isLoggedIn })
    };
};
const mapStateToProps = (state) => {
    return {
        userName: state.user.userName,
        isLoggedIn: state.user.isLoggedIn
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);