import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from '../CoinPicker';
import * as notifications from '../../utils/notifications';

class AutoBet extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.autoBetting = this.autoBetting.bind(this);
    }
    incRolls() {
        this.props.setAutoBetting({ ...this.props.autoBet, numberOfRolls: this.props.autoBet.numberOfRolls + 1 });
    }
    decRolls() {
        this.props.setAutoBetting({ ...this.props.autoBet, numberOfRolls: this.props.autoBet.numberOfRolls - 1 });
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value * 1;
        const name = target.name;
        this.props.setAutoBetting({ ...this.props.autoBet, [name]: value });
    }

    autoBetting() {
        if (!this.props.loggedIn) {
            notifications.UserNotLoggedin();
            return;
        }
        if (this.props.dice.isRolling) {
            this.props.setAutoBetting({ ...this.props.autoBet, numberOfRolls: 1, stop: true });
        }
    }

    render() {
        const coinName = this.props.dice.selectedCoin ? this.props.dice.selectedCoin.coinName : "";
        const autoBet = this.props.autoBet;
        return (

            <div className="the-box bg-cover">
                <strong className="font-large">Auto Betting Options</strong>
                <div className="form-group">
                    <label htmlFor="numofrolls">Number of Rolls(0=unlimited)</label>
                    <div className="input-group">
                        <input className="form-control" name="numberOfRolls" onChange={this.handleChange} value={autoBet.numberOfRolls} />
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
                        <input className="form-control" name="stopWin" onChange={this.handleChange} value={autoBet.stopWin} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Stop when losing (0=unlimited)</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" name="stopLoss" onChange={this.handleChange} value={autoBet.stopLoss} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on loss (0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnLose" onChange={this.handleChange} value={autoBet.increaseOnLose} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on win (0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnWin" onChange={this.handleChange} value={autoBet.increaseOnWin} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div>
                    <button className="btn btn-warning btn-perspective btn-md"
                        disabled={this.props.autoBet.numberOfRolls == 1 || !this.props.dice.isRolling} onClick={() => this.autoBetting()}>
                        Stop Auto Betting</button>
                </div>
            </div>
        );
    }
}
AutoBet.propTypes = {
    loggedIn: PropTypes.bool,
    dice: PropTypes.object,
    autoBet: PropTypes.object,
    roll: PropTypes.func,
    setAutoBetting: PropTypes.func
};
const mapStateToProps = (state) => {
    return {
        loggedIn: state.user.userName != null,
        dice: state.dice,
        autoBet: state.dice.autoBet
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAutoBetting: (autoBet) => dispatch({ type: 'SET_AUTOBETTING', autoBet })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoBet);
