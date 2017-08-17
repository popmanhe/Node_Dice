import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../../components/admin/header';

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
                    <Header />
                    {/* END TOP NAV */}
                    {/* BEGIN SIDEBAR LEFT */}
                    {/* /.sidebar-left */}
                    {/* END SIDEBAR LEFT */}
                    {/* BEGIN PAGE CONTENT */}
                    <div className="page-content">
                        <div className="container-fluid" style={{paddingTop: '30px'}}>
                            {/* BEGIN SiTE INFORMATIONS */}
                           
                            {p.children}

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
    userNotLogin: PropTypes.func,
    Header: PropTypes.element
};
const mapDispatchToProps = dispatch => ({
    userNotLogin: () => dispatch({ type: 'SET_USER', user: null }),
});
export default connect(null, mapDispatchToProps)(App);

