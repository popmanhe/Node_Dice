import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from './CoinPicker';
import { showNotification } from '../utils/tools';
import * as commonText from '../utils/commonText';
class AutoBet extends React.Component {
    constructor() {
        super();
        this.state = {
            numberOfRolls: 1,
            stopWin: 0,
            stopLoss: 0,
            increaseOnLose: 0,
            increaseOnWin: 0,
            autoBettingButtonText: 'Stop',
            stop: false,
            baseAmount: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.autoBetting = this.autoBetting.bind(this);
    }
    incRolls() {
        this.setState({ numberOfRolls: this.state.numberOfRolls + 1 });
    }
    decRolls() {
        this.setState({ numberOfRolls: Math.max(this.state.numberOfRolls - 1, 0) });
    }
    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    autoBetting() {
        if (!this.props.loggedIn) {
            showNotification(commonText.USERNOTLOGGEDINTITLE, commonText.USERNOTLOGGEDINTEXT, "warning");
            return;
        }
        this.setState({ baseAmount: this.props.ou.betAmount });
        this.startAutoBetting();
    }
    startAutoBetting() {
        if (this.state.numberofRolls > 1) {
            if (win) {
                if (this.state.stopWin * 1 > 0 && this.props.ou.betAmount >= this.state.stopWin) {
                    this.setState({ stop: true });
                }
                else if (this.state.incWin == 0) {
                    this.state.betAmount((this.state.ou.baseAmount * 1).toFixed(8));
                }
                else {
                    this.state.betAmount((this.state.ou.betAmount * (1 + this.state.incWin / 100)).toFixed(8));
                }
            }
            else {
                if (this.state.stopLoss * 1 > 0 && this.state.betAmount >= this.state.stopLoss) {
                    this.setState({ stop: true });
                }
                else if (this.state.incLoss() == 0) {
                    this.state.betAmount((this.state.baseAmount() * 1).toFixed(8));
                }
                else {
                    this.state.betAmount((this.state.betAmount * (1 + this.state.incLoss() / 100)).toFixed(8));
                }
            }
            if (!stop) {
                this.state.submitBet(this.state.selectedNumber <= 49.5 ? 0 : 1);
                this.state.numberofRolls(this.state.numberofRolls - 1);
            }
        }
    }
    render() {
        const coinName = this.props.ou.selectedCoin ? this.props.ou.selectedCoin.coinName : "";
        return (

            <div className="the-box bg-cover">
                <strong className="font-large">Auto Betting Options</strong>
                <div className="form-group">
                    <label htmlFor="numofrolls">Number of Rolls(0=unlimited)</label>
                    <div className="input-group">
                        <input className="form-control" name="numberOfRolls" onChange={this.handleChange} value={this.state.numberOfRolls} />
                        <span className="input-group-addon hand" onClick={() => this.incRolls()}>+</span>
                        <span className="input-group-addon hand" onClick={() => this.decRolls()}>-</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatprofit">Stop when winning (0=unlimited)</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" name="stopWin" onChange={this.handleChange} value={this.state.stopWin} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Stop when losing (0=unlimited)</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" name="stopLoss" onChange={this.handleChange} value={this.state.stopLoss} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on loss (0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnLose" onChange={this.handleChange} value={this.state.increaseOnLose} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on win (0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnWin" onChange={this.handleChange} value={this.state.increaseOnWin} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div className="col-lg-offset-4 col-md-offset-4 col-sm-offset-4">
                    <button className="btn btn-warning btn-perspective btn-sm" disabled={!this.props.ou.isRolling} onClick={() => this.autoBetting()}>{this.state.autoBettingButtonText}</button>
                </div>
            </div>
        );
    }
}
AutoBet.propTypes = {
    loggedIn: PropTypes.bool,
    ou: PropTypes.object,
    roll: PropTypes.func
};
const mapStateToProps = (state) => {
    return {
        loggedIn: state.user.userName != null,
        ou: state.ou
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        roll: (betAmount, selectedNumber, coinName) => dispatch({ type: 'ROLL', bet: { w: betAmount, sn: selectedNumber, coinName: coinName } })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoBet);
