import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';

const SignupModal = (props) => {
    return (
        <Modal show={props.show} dialogClassName="login">
            <Modal.Header closeButton>
                <Modal.Title componentClass="h2">Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SignupForm onClick={props.onCancel}/>
            </Modal.Body>
            <Modal.Footer><Button onClick={props.onCancel}>Cancel</Button>
            </Modal.Footer>
        </Modal>);

};
SignupModal.propTypes = {
    onCancel: PropTypes.func,
    show: PropTypes.bool
};

export default SignupModal;
