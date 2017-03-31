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
            return (<Username userName={p.userName} />);
        else
            return (
                <div>
                    <span onClick={() => this.setState({ showLoginModal: true })}>Log in</span> / <span onClick={() => this.setState({ showSignupModal: true })}>Sign up</span>
                    <LoginModal  show={this.state.showLoginModal}  onCancel={() => { this.setState({ showLoginModal: false }); }} />
                    <SignupModal show={this.state.showSignupModal} onCancel={() => { this.setState({ showSignupModal: false }); }} />
                </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.user.userName,
        isLoggedIn: state.user.isLoggedIn
    };
};
export default connect(mapStateToProps)(UserLogin);