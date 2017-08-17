import React, { Component } from 'react';
// import PropTypes from 'prop-types';


const propTypes = {};

const defaultProps = {};

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Settings</h1>
                <div className="col-sm-6">
                    <div className="the-box">
                        <div className="form-group">
                            <label>Currency</label>
                            <select className="form-control">
                                <option value="BTC">BTC</option>
                                <option value="NXT">NXT</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Currency Sign</label>
                            <input type="password" className="form-control rounded input-sm" placeholder="Currency Sign" />
                        </div>
                        <div className="form-group">
                            <label>Bet Freqency</label>
                            <input type="text" className="form-control rounded input-sm" placeholder="Bet Freqency" />
                        </div>
                        <div className="form-group">
                            <label>House Edge</label>
                            <input type="text" className="form-control rounded input-sm" placeholder="House Edge" />
                        </div>
                        <div className="form-group">
                            <label>Minimal Withdrawal</label>
                            <input type="text" className="form-control rounded input-sm" placeholder="Minimal Withdrawal" />
                        </div>
                        <div className="form-group">
                            <label>Transaction Fee</label>
                            <input type="text" className="form-control rounded input-sm" placeholder="Transaction Fee" />
                        </div>
                        <div className="form-group">
                            <label>Max Bet Ratio</label>
                            <input type="text" className="form-control rounded input-sm" placeholder="Max Bet Ratio" />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = propTypes;

Settings.defaultProps = defaultProps;

export default Settings;
