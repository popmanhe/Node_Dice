import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from './CoinPicker';
import { socketOn } from '../utils/socketIoHelper';
import { showNotification } from '../utils/tools';
import * as commonText from '../utils/commonText';

class OUBet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            betAmount: 0,
            payout: 2
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getCoinNames();
        this.receiveMyBet();
    }

    componentWillReceiveProps(nextProps) {
        //Get coin balance
        if (nextProps.loggedIn && ((nextProps.loggedIn != this.props.loggedIn) ||
            (nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName))) {
            this.getBalance(nextProps.selectedCoin.coinName);
        }
        //Set min betAmount when changing coin
        if (!this.props.selectedCoin || nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName) {
            this.setBetAmount(nextProps.selectedCoin.min);
        }
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    showResult(result) {
        if ((result.selNum * 1 <= 49.5 && result.rollNum * 1 <= result.selNum * 1)
            || (result.selNum * 1 >= 50.49 && result.rollNum * 1 >= result.selNum * 1)) {
            if (this.props.autoBet.numberOfRolls == 1) //Don't show notification when auto betting
                showNotification('', 'Dice:' + result.rollNum + '. You won', 'success');
            this.setState({ balance: (this.state.balance * 1 + result.profit * 1).toFixed(8) });
            return true;
        }
        else {
            if (this.props.autoBet.numberOfRolls == 1) //Don't show notification when auto betting
                showNotification('', 'Dice:' + result.rollNum + '. You lost', 'error');
            this.setState({ balance: (this.state.balance - result.amount).toFixed(8) });
            return false;
        }

    }

    receiveMyBet() {
        const self = this;
        socketOn('allBets', function (result) {
            const s = self.state;
            const p = self.props;
            let stop = false;
            if (p.user.userid == result.userid) {
                const win = self.showResult(result);
 
                if (win) {
                    if (p.autoBet.stopWin * 1 > 0 && s.betAmount >= p.autoBet.stopWin) {
                        stop = true;
                    }
                    else if (p.autoBet.increaseOnWin == 0) {
                        self.setState({ betAmount: (s.baseAmount * 1).toFixed(8) });
                    }
                    else {
                        self.setState({ betAmount: (s.betAmount * (1 + p.autoBet.increaseOnWin / 100)).toFixed(8) });
                    }
                }
                else {
                    if (p.autoBet.stopLoss * 1 > 0 && s.betAmount >= p.autoBet.stopLoss) {
                        stop = true;
                    }
                    else if (p.autoBet.increaseOnLose == 0) {
                        self.setState({ betAmount: (s.baseAmount * 1).toFixed(8) });
                    }
                    else {
                        self.setState({ betAmount: (s.betAmount * (1 + p.autoBet.increaseOnLose / 100)).toFixed(8) });
                    }
                }
                
                if (!stop && (p.autoBet.numberOfRolls > 1 || p.autoBet.numberOfRolls == 0))
                    self.roll(s.rollNum);
            }
            self.endRoll();
        });
    }
    receiveErrorRoll() {
        const self = this;
        socketOn('rollError', function (result) {
            switch (result.code) {
                case -1:
                    showNotification('Fund not enough', 'Your balance is not enough. Deposit more fund.', 'warning');
                    break;
                case -2:
                case -3:
                    showNotification('Invalid', 'Bet amount is invalid', 'warning');
                    break;
                case -4:
                case -5:
                case -6:
                    showNotification('ERROR', 'Internal error.', 'warning');
                    break;
            }
            self.endRoll();
        });
    }
    endRoll() {
        if (this.props.autoBet.numberOfRolls == 1)
            this.props.endRoll();
    }
    getCoinNames() {
        if (!this.props.coins || this.props.coins.length == 0) {
            this.props.getCoinNames();
            socketOn('coinNames', (result) => { this.props.setCoinNames(result); });
        }
    }
    getBalance(coinName) {
        if (coinName) {
            this.props.refreshBalance(coinName);
            socketOn('getBalance', (result) => this.setState({ balance: result.toFixed(8) }));
        }
    }
    refreshBalance() {
        if (this.props.loggedIn)
            this.getBalance(this.props.selectedCoin.coinName);
        else
            showNotification(commonText.USERNOTLOGGEDINTITLE, commonText.USERNOTLOGGEDINTEXT, "warning");
    }
    multiplyAmount(n) {
        let betAmount = this.state.betAmount * n;
        betAmount = Math.min(betAmount, this.props.selectedCoin.max);
        betAmount = Math.max(betAmount, this.props.selectedCoin.min);

        if (betAmount >= this.props.selectedCoin.min && betAmount <= this.props.selectedCoin.max)
            this.setBetAmount(betAmount);
    }
    minBetAmount() {
        this.setBetAmount(this.props.selectedCoin.min);
    }
    maxBetAmount() {
        this.setBetAmount(this.props.selectedCoin.max);
    }
    increasePayout() {
        let payout = this.state.payout + 0.1;

        this.setState({ payout });
    }
    decreasePayout() {
        let payout = this.state.payout - 0.1;
        if (payout >= 2)
            this.setState({ payout });
    }
    roll(rollNum) {
        if (!this.props.loggedIn) {
            showNotification(commonText.USERNOTLOGGEDINTITLE, commonText.USERNOTLOGGEDINTEXT, "warning");
            return;
        }
        if (this.state.betAmount > this.state.balance) {
            showNotification('Fund not enough', 'Your balance is not enough. Deposit more fund.', 'warning');
            return;
        }
        this.setState({ rollNum });
        if (this.props.autoBet.numberOfRolls >= 1)
            this.props.roll(this.state.betAmount, this.state.rollNum, this.props.selectedCoin.coinName);
    }
    setBetAmount(betAmount) {
        this.setState({ betAmount: betAmount.toFixed(8) });
        this.props.setBetAmount(betAmount);
    }
    render() {
        const coinName = this.props.selectedCoin ? this.props.selectedCoin.coinName : "";
        const profitOnWin = (this.state.betAmount * (this.state.payout - 1)).toFixed(8);

        const rollUnder = (100 / this.state.payout * 0.99).toFixed(2);
        const rollOver = (99.99 - rollUnder).toFixed(2);

        return (
            <div className="the-box">
                <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input type="text" value={this.state.balance} className="form-control hand" readOnly="readonly" />
                        <span className="input-group-addon hand" onClick={() => this.refreshBalance()}><i className="fa fa-refresh" title="Refresh balance" /></span>
                    </div>
                </div>
                <div className="form-group">
                    <label>BET AMOUNT</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" name="betAmount" onChange={this.handleChange} value={this.state.betAmount} />
                        <span className="input-group-addon hand" onClick={() => this.multiplyAmount(2)}>x 2</span>
                        <span className="input-group-addon hand" onClick={() => this.multiplyAmount(0.5)}>/ 2</span>
                        <span className="input-group-addon hand" onClick={() => this.minBetAmount()}>Min</span>
                        <span className="input-group-addon hand" onClick={() => this.maxBetAmount()}>Max</span>
                    </div>
                    <span className="help-block" />
                </div>
                <div className="form-group">
                    <label>PAYOUT</label>
                    <div className="input-group">
                        <span className="input-group-addon">x</span>
                        <input type="text" className="form-control" onChange={this.handleChange} value={this.state.payout.toFixed(4)} name="payout" />
                        <span className="input-group-addon hand" onClick={() => this.increasePayout()}>+</span>
                        <span className="input-group-addon hand" onClick={() => this.decreasePayout()}>-</span>
                    </div>
                    <p className="text-danger" />

                </div>
                <div className="form-group">
                    <label>PROFIT ON WIN</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" readOnly="true" value={profitOnWin} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4 col-sm-offset-2">
                        <button className="btn btn-success btn-perspective btn-lg" disabled={this.props.isRolling} onClick={() => { this.setState({ baseAmount: this.state.betAmount }); this.roll(rollOver); }} >Over {rollOver}</button>
                    </div>

                    <div className="col-sm-4">
                        <button className="btn btn-danger btn-perspective btn-lg" disabled={this.props.isRolling} onClick={() => { this.setState({ baseAmount: this.state.betAmount }); this.roll(rollUnder); }}  >Under {rollUnder}</button>
                    </div>
                </div>
            </div>

        );

    }
}

OUBet.propTypes = {
    getCoinNames: PropTypes.func,
    setCoinNames: PropTypes.func,
    refreshBalance: PropTypes.func,
    roll: PropTypes.func,
    coins: PropTypes.array,
    selectedCoin: PropTypes.object,
    loggedIn: PropTypes.bool,
    user: PropTypes.object,
    autoBet: PropTypes.object,
    isRolling: PropTypes.bool,
    endRoll: PropTypes.func,
    setBetAmount: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        coins: state.ou.coins,
        selectedCoin: state.ou.selectedCoin,
        loggedIn: state.user.userName != null,
        user: state.user,
        autoBet: state.ou.autoBet,
        isRolling: state.ou.isRolling
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCoinNames: () => dispatch({ type: 'GET_COINNAMES' }),
        setCoinNames: (coins) => dispatch({ type: 'SET_COINNAMES', coins }),
        refreshBalance: (coinName) => dispatch({ type: 'REFRESH_BALANCE', coinName }),
        endRoll: () => dispatch({ type: 'END_ROLL' }),
        setBetAmount: (betAmount) => dispatch({ type: 'SET_BETAMOUNT', betAmount }),
        roll: (betAmount, selectedNumber, coinName) => dispatch({ type: 'ROLL', bet: { w: betAmount, sn: selectedNumber, coinName: coinName } })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OUBet);
