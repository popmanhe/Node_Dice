import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: "", password: "", confirmPassword: "", error: "" };
        this.onSignup = this.onSignup.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSignup(e) {
        e.preventDefault();
        this.props.onSignup(this.state.userName, this.state.password);

    }
    onCancel() {
        this.clearData();
        this.props.onCancel();
    }

    clearData() {
        this.setState({ userName: "", password: "", confirmPassword: "", error:"" });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name == "confirmPassword")
        {
            this.setState({});
        }
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title id="user-login" componentClass="h2">Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" onSubmit={this.onSignup}>
                        <div className="form-group has-feedback lg left-feedback no-label">
                            <input type="text" name="userName" onChange={this.handleChange} value={this.state.userName} className="form-control no-border input-lg rounded" placeholder="Enter username" autoFocus />
                            <span className="fa fa-user form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback lg left-feedback no-label">
                            <input type="password" name="password" onChange={this.handleChange} value={this.state.password}  className="form-control no-border input-lg rounded" placeholder="Enter password" />
                            <span className="fa fa-unlock-alt form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback lg left-feedback no-label">
                            <input type="password" name="confirmPassword" onChange={this.handleChange}  value={this.state.confirmPassword} className="form-control no-border input-lg rounded" placeholder="Confirm password" />
                            <span className="fa fa-unlock-alt form-control-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg btn-perspective btn-block" onClick={this.onSignup}>Create an account</button>
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer><Button onClick={this.onCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>);
    }
}

SignupModal.propTypes = {
    show: PropTypes.bool,
    onSignup: PropTypes.func,
    onCancel: PropTypes.func
};
export default SignupModal;
