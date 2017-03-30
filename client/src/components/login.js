import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Username from './Username';
import LoginModal from './loginModal';
import {socketOn} from '../utils/socketIoHelper';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, isLoggedIn: false };

    }

    componentDidMount() {
        this.loggedUser();
    }

    loggedUser() {
        socketOn('loggedUser', (result) => {
            this.setState({isLoggedIn: result});
        });
    }
    render() {
        const p = this.props;
        if (this.state.isLoggedIn && p.userName != null)
            return (<Username userName={p.userName} />);
        else
            return (
                <div>
                    <span onClick={() => this.setState({ showModal: true })}>Log in</span>
                    <LoginModal show={this.state.showModal} onLogin={this.props.onLogin} onCancel={() => { this.setState({ showModal: false }); }} />
                </div>);
    }
}
Login.propTypes = {
    onLogin: PropTypes.func

};
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userName, password, rememberMe) => dispatch({ type: 'LOGIN_USER', userName, password, rememberMe })
    };
};
const mapStateToProps = (state) => {
    return {
        userName: state.user.userName
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);