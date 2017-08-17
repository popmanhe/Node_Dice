import React, { Component } from 'react';
// import PropTypes from 'prop-types';


const propTypes = {};

const defaultProps = {};

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="col-md-7 col-sm-10 col-xs-12  the-box full no-border">
                <div className="table-responsive">
                    <table className="table table-th-block">
                        <thead>
                            <tr><th style={{ width: '30px' }}>ID</th><th>Time</th><th>Type</th><th>Message</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td>2017/01/12</td><td><span className="label label-success" > success</span></td><td>success message</td> </tr>
                            <tr><td>2</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>2</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>3</td><td>2017/01/12</td><td><span className="label label-warning" > warning</span></td><td>warning message</td></tr>
                            <tr><td>4</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>5</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>6</td><td>2017/01/12</td><td><span className="label label-success" > success</span></td><td>success message</td></tr>
                            <tr><td>7</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>8</td><td>2017/01/12</td><td><span className="label label-warning" > warning</span></td><td>warning message</td></tr>
                            <tr><td>9</td><td>2017/01/12</td><td><span className="label label-danger" > error</span></td><td>error message</td></tr>
                            <tr><td>10</td><td>2017/01/12</td><td><span className="label label-warning" > warning</span></td><td>warning message</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Log.propTypes = propTypes;

Log.defaultProps = defaultProps;

export default Log;
