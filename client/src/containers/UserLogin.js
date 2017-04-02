import React from 'react';
import { connect } from 'react-redux';
import Username from '../components/Username';
import LoginModal from '../components/LoginModal';
import SignupModal from './SignupModal';
 
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoginModal: false, isLoggedIn: false };

    }

    render() {
        const p = this.props;
        if (p.isLoggedIn && p.userName != null)
            return ( <Username userName={p.userName} />);
        else
            return (
                 <a className="dropdown-toggle hand" data-toggle="dropdown">
                    <span onClick={() => this.setState({ showLoginModal: true })}><i className="fa fa-sign-in icon-circle icon-xs icon-default" /> Log in</span> / <span onClick={() => this.setState({ showSignupModal: true })}><i className="fa fa-plus  icon-circle icon-xs icon-default" /> Sign up</span>
                    <LoginModal  show={this.state.showLoginModal}  onCancel={() => { this.setState({ showLoginModal: false }); }} />
                    <SignupModal show={this.state.showSignupModal} onCancel={() => { this.setState({ showSignupModal: false }); }} />
                </a>);
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.user.userName,
        isLoggedIn: state.user.isLoggedIn
    };
};
export default connect(mapStateToProps)(UserLogin);