import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Stats</h1>
                <div className="row">
                    <div className="col-md-4 col-xs-12 list-group info">
                        <a className="list-group-item">Number of bets<span className="badge badge-info">3444444444443</span></a>
                        <a className="list-group-item">Total wagered <span className="badge badge-info">2345.34692346346</span></a>
                        <a className="list-group-item">Total profit <span className="badge badge-info">11.3463246346</span></a>
                        <a className="list-group-item">Real house edge <span className="badge badge-warning">0.0145</span></a>
                        <a className="list-group-item">Wins <span className="badge badge-success">75346342</span></a>
                        <a className="list-group-item">Losses <span className="badge badge-danger">754362346</span></a>
                        <a className="list-group-item">W/L ratio <span className="badge badge-info">1.01</span></a>
                    </div>
                    <div className="col-md-7 col-xs-12 the-box full no-border">
                        <div className="table-responsive">
                            <table className="table table-th-block">
                                <thead>
                                    <tr><th>Period</th><th>Real House Edge</th><th>Profit</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Last Hour</td><td>Yogyakarta, Indonesia</td><td>August 17, 1990</td></tr>
                                    <tr><td>Last 24hour</td><td>Bndung, Indonesia</td><td>Jan 01, 1987</td></tr>
                                    <tr><td>Last 7 days</td><td>Lombok, Indonesia</td><td>Dec 31, 1993</td></tr>
                                    <tr><td>Last 30 days</td><td>Sydney, Australia</td><td>Jun 05, 1992</td></tr>
                                    <tr><td>Last 3 months</td><td>London, United Kingdom</td><td>Mar 10, 1985</td></tr>
                                    <tr><td>Last 6 months</td><td>New York, US</td><td>Jul 01, 1989</td></tr>
                                    <tr><td>Last 12 months</td><td>Pattaya, Thailand</td><td>Nov 21, 1991</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Stats.propTypes = propTypes;

Stats.defaultProps = defaultProps;

export default Stats;
