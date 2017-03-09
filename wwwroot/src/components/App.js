import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NameUser from  './NameUser';
import Chat from  './Chat';
import Username from './Username';
import CoinPicker from './CoinPicker';
// This is a className-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
        <div>
            <NameUser />

            <div className="wrapper">

                <div className="top-navbar info-color">
                    <div className="top-navbar-inner">
                        <div className="logo-brand info-color visible-lg">
                            <Link to="/"><img src="/img/sentir-logo-primary.png" alt="Sentir logo" /></Link>
                        </div>
                        <div className="top-nav-content">
                            <div className="btn-collapse-sidebar-left">
                                <i className="fa fa-bars" />
                            </div>
                            <div className="btn-collapse-sidebar-right">
                                <i className="fa fa-bullhorn">Chat</i>
                            </div>

                            <div className="btn-collapse-nav" data-toggle="collapse" data-target="#main-fixed-nav">
                                <i className="fa fa-plus icon-plus" />
                            </div>

                            <ul className="nav-user navbar-right">
                                <li className="dropdown">
                                    <a className="dropdown-toggle hand" data-toggle="dropdown">
                                        <img src="/img/avatar/avatar.jpg" className="avatar img-circle" alt="Avatar" />
                                        Hi,   <Username />
                                    </a>
                                    <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                                        <li><Link to="/profile">Profile</Link></li>
                                        <li><Link to="/withdraw">Withdraw</Link></li>
                                        <li><Link to="/deposit">Deposit</Link></li>
                                        <li className="divider" />
                                        <li><Link to="lock-screen.html">Lock screen</Link></li>
                                        <li><Link to="login.html">Log out</Link></li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="collapse navbar-collapse" id="main-fixed-nav">

                                <ul className="nav navbar-nav navbar-left">
                                    <li>
                                        <Link to="/">
                                            Home
                                </Link>

                                    </li>
                                    <li>
                                        <Link href="/investment">Investment</Link>
                                    </li>
                                    <li>
                                        <Link to="/verification">Verification</Link>
                                    </li>
                                    <li>
                                        <Link to="/faq">FAQ</Link>
                                    </li>
                                    <li>
                                        <Link to="/support">Support</Link>
                                    </li>
                                    <li>
                                        <a className="dropdown-toggle hand" data-toggle="dropdown">Switch Coins<span className="caret" /></a>
                                        <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                                            <li><CoinPicker name="BTC" /></li>
                                            <li><CoinPicker name="NXT" /></li>
                                        </ul>
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="sidebar-right-heading">
                    <ul className="nav nav-tabs square nav-justified">
                        <li className="active"><Link to="#online-chat" data-toggle="tab"><i className="fa fa-comments" /></Link></li>
                    </ul>
                </div>
                <div className="sidebar-right sidebar-nicescroller">
                    <div className="tab-content">
                        <div className="tab-pane fade in active" data-bind="stopBinding: true" id="online-chat">
                            <Chat />
                        </div>

                    </div>
                </div>

                <div className="page-content">
                    <div className="container-fluid">
                        <div id="background">
                            <img src="/img/bg-11-full.jpg" className="stretch" alt="" />
                        </div>
                        <div className="row">
                            {this.props.children}
                        </div>

                    </div>
                    <footer>
                        &copy; 2017 <Link to="#fakelink">Node Dice</Link><br />
                    </footer>
                </div>
            </div>
            <div id="back-top">
                <Link to="#top"><i className="fa fa-chevron-up" /></Link>
            </div>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
