import React, { Component } from 'react';
// import PropTypes from 'prop-types';


const propTypes = {};

const defaultProps = {};

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <div className="row">
                    <div className="col-sm-4 col-xs-8">
                        <input type="text" className="form-control" value="" placeholder="User name" />
                    </div>
                    <div className="col-sm-3 col-xs-3">
                        <button className="btn btn-success">Search</button>
                    </div>
                </div>
                <br />
                <div className="col-md-7 col-sm-10 col-xs-12  the-box full no-border">
                    <div className="table-responsive">
                        <table className="table table-th-block">
                            <thead>
                                <tr><th style={{ width: '30px' }}>ID</th><th>User Name</th><th>Address</th><th>Balance</th><th>Last Access</th><th>Manage</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>Paris Hawker</td><td>Yogyakarta, Indonesia</td><td>0.00014000</td><td>2017/01/12</td><td><span className="label label-success" style={{ cursor: "pointer" }} ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" style={{ cursor: "pointer" }}  ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>2</td><td>Thomas White</td><td>Bndung, Indonesia</td><td>0.00014000</td><td>2017/01/17</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>3</td><td>Doina Slaivici</td><td>Lombok, Indonesia</td><td>0.00014000</td><td>2017/01/12</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>4</td><td>Mihaela Cihac</td><td>Sydney, Australia</td><td>0.00014000</td><td>2017/01/12</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>5</td><td>Harold Chavez</td><td>London, United Kingdom</td><td>0.00014000</td><td>2017/01/17</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>6</td><td>Elizabeth Owens</td><td>New York, US</td><td>0.00014000</td><td>2017/01/12</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>7</td><td>Frank Oliver</td><td>Pattaya, Thailand</td><td>0.00014000</td><td>2017/01/17</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>8</td><td>Mya Weastell</td><td>Boyolali, Indonesia</td><td>0.00014000</td><td>2017/01/12</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>9</td><td>Harry Nichols</td><td>Berlin, Germany</td><td>0.00014000</td><td>2017/01/17</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                                <tr><td>10</td><td>Carl Rodriguez</td><td>Melbourne, Australia</td><td>0.00014000</td><td>2017/01/17</td><td><span className="label label-success" ><span className="glyphicon glyphicon-pencil" /></span> <span className="label label-danger" ><span className="glyphicon glyphicon-remove" /></span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

Users.propTypes = propTypes;

Users.defaultProps = defaultProps;

export default Users;
