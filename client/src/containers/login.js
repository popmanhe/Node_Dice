import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Username from '../components/Username';
import LoginModal from '../components/LoginModal';
import SignupModal from './SignupModal';
import { socketOn } from '../utils/socketIoHelper';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showLoginModal: false, isLoggedIn: false };

    }

    componentDidMount() {
        this.loggedUser();
    }

    loggedUser() {
        socketOn('loggedUser', (result) => {
            console.log(result);
            if (result.isLoggedIn)
                this.props.setUser({ userName: result.userName, isLoggedIn: true });
            else
                this.props.setUser({ userName: null, isLoggedIn: false });
        });
    }
    render() {
        const p = this.props;
        if (p.isLoggedIn && p.userName != null)
            return (<Username userName={p.userName} />);
        else
            return (
                <div>
                    <span onClick={() => this.setState({ showLoginModal: true })}>Log in</span> / <span onClick={() => this.setState({ showSignupModal: true })}>Sign up</span>
                    <LoginModal show={this.state.showLoginModal} onLogin={this.props.onLogin} onCancel={() => { this.setState({ showLoginModal: false }); }} />
                    <SignupModal show={this.state.showSignupModal} onCancel={() => { this.setState({ showSignupModal: false }); }} />
                </div>);
    }
}
Login.propTypes = {
    onLogin: PropTypes.func,
 
    setUser: PropTypes.func
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userName, password, rememberMe) => dispatch({ type: 'LOGIN_USER', userName, password, rememberMe }),
        setUser: (userName, isLoggedIn) => dispatch({ type: "SET_USER", userName, isLoggedIn })
    };
};
const mapStateToProps = (state) => {
    return {
        userName: state.user.userName,
        isLoggedIn: state.user.isLoggedIn
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);