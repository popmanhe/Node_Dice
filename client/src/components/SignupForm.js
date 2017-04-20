import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { socketOn } from '../utils/diceSocketHelper';
import '../styles/bootstrapValidator.css';
import '../lib/bootstrapValidator';
import CheckBox from './Basic/CheckBox';
import { show } from '../utils/notifications';

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
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
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
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The password must be more than 6 and less than 30 characters long'
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
            socketOn('newUser', (result) => {

                if (result.error) {
                    switch (result.error.code) {
                        case 11000:
                            show('User name exists', 'Choose different one.', 'error');
                            break;
                        default:
                            show('Error', result.error, 'error');
                            this.props.setUser(null, false);
                    }
                }
                else {
                    this.props.setUser(result, true);
                }
            });

        }
        else
            show('', 'Please check "I accept" before registering.', 'warning');
    }

    clearData() {
        this.setState({ userName: "", password: "", confirmPassword: "", error: "" });
    }

    handleChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="login-wrapper">
                <form role="form" onSubmit={this.onSignup} id="signupForm">

                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <div>
                            <input type="text" className="form-control" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="Choose username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <div>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label">Retype password</label>
                        <div>
                            <input type="password" className="form-control" name="confirmPassword" onChange={this.handleChange} value={this.state.confirmPassword} placeholder="re-enter password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <label className="inline-popups">
                                <CheckBox name="acceptTerm" onChange={this.handleChange} className="i-yellow-flat" /> I accept <a href="#text-popup" data-effect="mfp-zoom-in">Terms and conditions</a>
                            </label>
                        </div>
                    </div>
                    <div className="form-group">

                        <button type="submit" onClick={this.onSignup} className="btn btn-warning btn-perspective btn-block">REGISTER</button>

                    </div>
                </form>
            </div>
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
        setUser: (user, isLoggedIn) => dispatch({ type: "SET_USER", user, isLoggedIn })
    };
};

export default connect(null, mapDispatchToProps)(SignupForm);