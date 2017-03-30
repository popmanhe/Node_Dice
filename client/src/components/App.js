import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Login from './login';
import CoinPicker from './CoinPicker';
// This is a classNameName-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
    render() {
        const p = this.props;
        return (
            <div>
                {/*
    ===========================================================
    BEGIN PAGE
    ===========================================================
    */}
                <div className="wrapper">
                    {/* BEGIN TOP NAV */}
                    <div className="top-navbar info-color">
                        <div className="top-navbar-inner">

                            {/* Begin Logo brand */}
                            <div className="logo-brand info-color visible-lg">
                                <Link to="/"><img src="/img/sentir-logo-primary.png" alt="Sentir logo" /></Link>
                            </div> {/* /.logo-brand */}
                            {/* End Logo brand */}

                            <div className="top-nav-content">

                                {/* Begin button sidebar left toggle */}
                                <div className="btn-collapse-sidebar-left">
                                    <i className="fa fa-bars" />
                                </div> {/* /.btn-collapse-sidebar-left */}
                                {/* End button sidebar left toggle */}
                                {/* Begin button sidebar right toggle */}
                                <div className="btn-collapse-sidebar-right">
                                    {/*<i className="fa fa-bullhorn">Chat</i>*/}
                                </div> {/* /.btn-collapse-sidebar-right */}
                                {/* End button sidebar right toggle */}
                                {/* Begin button nav toggle */}
                                <div className="btn-collapse-nav" data-toggle="collapse" data-target="#main-fixed-nav">
                                    <i className="fa fa-plus icon-plus" />
                                </div> {/* /.btn-collapse-sidebar-right */}
                                {/* End button nav toggle */}
                                {/* Begin user session nav */}
                                <ul className="nav-user navbar-right">
                                    <li className="dropdown">
                                        <a className="dropdown-toggle hand" data-toggle="dropdown">
                                            {/*<img src="/img/avatar/avatar.jpg" className="avatar img-circle" alt="Avatar" />*/}
                                           <Login />
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
                                {/* End user session nav */}
                                {/* Begin Collapse menu nav */}
                                <div className="collapse navbar-collapse" id="main-fixed-nav">

                                    <ul className="nav navbar-nav navbar-left">
                                        <li>
                                            <Link to="/">
                                                Home
                                </Link>
                                        </li>
                                        <li>
                                            <Link to="/investment">Investment</Link>
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
                                                <li><CoinPicker coin="BTC" /></li>
                                                <li><CoinPicker coin="NXT" /></li>
                                            </ul>
                                        </li>

                                    </ul>

                                </div> {/* /.navbar-collapse */}
                                {/* End Collapse menu nav */}
                            </div> {/* /.top-nav-content */}
                        </div> {/* /.top-navbar-inner */}
                    </div> {/* /.top-navbar */}
                    {/* END TOP NAV */}
                    {/* BEGIN SIDEBAR LEFT */}
                    {/* /.sidebar-left */}
                    {/* END SIDEBAR LEFT */}
                    {/* BEGIN SIDEBAR RIGHT HEADING */}
                    <div className="sidebar-right-heading">
                        <ul className="nav nav-tabs square nav-justified">
                            <li className="active"><Link to="#online-chat" data-toggle="tab"><i className="fa fa-comments" /></Link></li>
                        </ul>
                    </div> {/* /.sidebar-right-heading */}
                    {/* END SIDEBAR RIGHT HEADING */}
                    {/* BEGIN SIDEBAR RIGHT */}
                    <div className="sidebar-right sidebar-nicescroller">
                        <div className="tab-content">
                            <div className="tab-pane fade in active" id="online-chat">
                                {/*    <Chat /> */}
                            </div>

                        </div> {/* /.tab-content */}
                    </div> {/* /.sidebar-right */}
                    {/* END SIDEBAR RIGHT */}
                    {/* BEGIN PAGE CONTENT */}
                    <div className="page-content">
                        <div className="container-fluid">
                            {/*     <div id="background">
                    <img src="/img/bg-11-full.jpg" className="stretch" alt="" />
                </div>*/}
                            {/* BEGIN SiTE INFORMATIONS */}
                            <p>{' ' }</p>
                                {this.props.children}
                            
                            {/* /.row */}
                            {/* END SITE INFORMATIONS */}

                        </div> {/* /.container-fluid */}
                        {/* BEGIN FOOTER */}
                        <footer>
                            &copy; 2017 <Link to="#fakelink">Node Dice</Link><br />
                        </footer>
                        {/* END FOOTER */}
                    </div>
                    {/* /.page-content*/}


                </div> {/* /.wrapper */}
                {/* END PAGE CONTENT */}
                {/* BEGIN BACK TO TOP BUTTON */}
                <div id="back-top">
                    <a href="#top"><i className="fa fa-chevron-up" /></a>
                </div>
                {/* END BACK TO TOP */}
                {/*
    ===========================================================
    END PAGE
    ===========================================================
    */}

            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};
 
export default App;
 