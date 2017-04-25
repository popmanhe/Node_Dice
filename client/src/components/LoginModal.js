import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CheckBox from './Basic/CheckBox';
import { connect } from 'react-redux';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: "", password: "", rememberMe: false };
        this.onLogin = this.onLogin.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onLogin(e) {
        e.preventDefault();
        this.props.onLogin(this.state.userName, this.state.password, this.state.rememberMe);
    }


    onCancel() {
        this.clearData();
        this.props.onCancel();
    }

    clearData() {
        this.setState({ userName: "", password: "", rememberMe: false });
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
            <Modal show={this.props.show} dialogClassName="login">
                <Modal.Header>
                    <Modal.Title id="user-login" componentClass="h2">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="login-wrapper">
                        <form role="form" onSubmit={this.onLogin}>
                            <div className="form-group has-feedback lg left-feedback no-label">
                                <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} className="form-control no-border input-lg rounded" placeholder="Enter username" autoFocus />
                                <span className="fa fa-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback lg left-feedback no-label">
                                <input type="password" name="password" onChange={this.handleChange} value={this.state.password} className="form-control no-border input-lg rounded" placeholder="Enter password" />
                                <span className="fa fa-unlock-alt form-control-feedback" />
                            </div>
                            <div className="form-group ">
                                <div className="checkbox col-lg-offset-1  col-md-offset-1">
                                    <label>     <CheckBox name="rememberMe" onChange={this.handleChange} checked={this.state.rememberMe} /> Remember me</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-warning btn-perspective btn-block" onClick={this.onLogin} >LOGIN</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer><Button onClick={this.onCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>);
    }
}

LoginModal.propTypes = {
    show: PropTypes.bool,
    onLogin: PropTypes.func,
    onCancel: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userName, password, rememberMe) => dispatch({ socket: 'dice', type: 'AUTHENTICATE', user: { userName, password, rememberMe } })
    };
};
export default connect(null, mapDispatchToProps)(LoginModal);

