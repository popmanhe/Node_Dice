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
                        <a className="list-group-item">Wins <span className="badge badge-success">75346342</span></a>
                        <a className="list-group-item">Losses <span className="badge badge-danger">754362346</span></a>
                        <a className="list-group-item">W/L ratio <span className="badge badge-info">1.01</span></a>
                    </div>
                    <div className="col-md-6 col-xs-12 the-box full no-border">
                        <div className="table-responsive">
                            <table className="table table-th-block">
                                <thead>
                                    <tr><th>Period</th><th>Profit</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Last Hour</td><td>1.2235235</td></tr>
                                    <tr><td>Last 24hour</td><td>20.124124</td></tr>
                                    <tr><td>Last 7 days</td><td>112.34623634</td></tr>
                                    <tr><td>Last 30 days</td><td>235.3462346</td></tr>
                                    <tr><td>Last 3 months</td><td>1234.235235235</td></tr>
                                    <tr><td>Last 6 months</td><td>23523.2352335</td></tr>
                                    <tr><td>Last 12 months</td><td>23523.35233747</td></tr>
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
