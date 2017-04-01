import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from './CoinPicker';
class AutoBet extends React.Component {
    constructor() {
        super();
        this.state = {
            numberOfRolls: 1,
            stopWin: 0,
            stopLoss: 0,
            increaseOnLose: 0,
            increaseOnWin: 0
        };
        this.handleChange = this.handleChange.bind(this);
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
    render() {
        const coinName = this.props.selectedCoin ? this.props.selectedCoin.coinName : "";
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
                    <label htmlFor="stopatprofit">Stop when winning</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control"  name="stopWin" onChange={this.handleChange} value={this.state.stopWin} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Stop when losing</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" name="stopLoss" onChange={this.handleChange} value={this.state.stopLoss} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on loss(0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnLose" onChange={this.handleChange} value={this.state.increaseOnLose} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="stopatloss">Increase on win(0=return to base)</label>
                    <div className="input-group">
                        <input className="form-control" name="increaseOnWin" onChange={this.handleChange} value={this.state.increaseOnWin} />
                        <span className="input-group-addon hand">%</span>
                    </div>
                </div>
                <div className="col-lg-offset-4 col-md-offset-4 col-sm-offset-4">
                    <button className="btn btn-warning btn-perspective btn-sm">Start</button>
                </div>
            </div>

        );

    }
}
AutoBet.propTypes = {
    coins: PropTypes.array,
    selectedCoin: PropTypes.object,
    loggedIn: PropTypes.bool
};
const mapStateToProps = (state) => {
    return {
        coins: state.ou.coins,
        selectedCoin: state.ou.selectedCoin,
        loggedIn: state.user.userName != null
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoBet);
