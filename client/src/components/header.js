import React from 'react';
// import PropTypes from 'prop-types'
// import styles from './style.css';
import { Link } from 'react-router';
import Login from '../containers/UserLogin';

const propTypes = {};

const defaultProps = {};

const Header = () => (

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
                        {/*<li>
                                            <Link to="/raffle">Raffle</Link>
                                        </li>*/}
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
    </div>
);

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
