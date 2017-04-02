import React, { PropTypes } from 'react';
import { Link } from 'react-router';
const Username = (props) => {
    return (
        <div>
            <a className="dropdown-toggle hand" data-toggle="dropdown">
                <img src="/img/avatar/avatar.jpg" className="avatar img-circle" alt="Avatar" /> {props.userName}
            </a>
            <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/withdraw">Withdraw</Link></li>
                <li><Link to="/deposit">Deposit</Link></li>
                <li className="divider" />
                {/*<li><Link to="lock-screen.html">Lock screen</Link></li>*/}
                <li><Link to="login.html">Log out</Link></li>
            </ul>
        </div>
    );

};
Username.propTypes = {
    userName: PropTypes.string
};
export default Username;