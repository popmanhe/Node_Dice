import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from '../containers/UserLogin';
import { socketOn } from '../utils/diceSocketHelper';

class App extends React.Component {
    componentDidMount() {
        socketOn('invalidUser', () => {
            this.props.userNotLogin();
        });
    }
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
                                        <Login />
                                    </li>
                                </ul>
                                {/* End user session nav */}
                                {/* Begin Collapse menu nav */}
                                <div className="collapse navbar-collapse" id="main-fixed-nav">

                                    <ul className="nav navbar-nav navbar-left">
                                        <li>
                                            <Link to="/">Dice</Link>
                                        </li>
                                         <li>
                                            <Link to="/raffle">Raffle</Link>
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
                    {/* BEGIN PAGE CONTENT */}
                    <div className="page-content">
                        <div className="container-fluid">
                            <div id="background">
                                <img src="/img/bg-11-full.jpg" className="stretch" alt="" />
                            </div>
                            {/* BEGIN SiTE INFORMATIONS */}
                            <p>{' '}</p>
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
    children: PropTypes.element,
    userNotLogin: PropTypes.func
};
const mapDispatchToProps = dispatch => ({
    userNotLogin: () => dispatch({ type: 'SET_USER', user: null }),
});
export default connect(null, mapDispatchToProps)(App);

