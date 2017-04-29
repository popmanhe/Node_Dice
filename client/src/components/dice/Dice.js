import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from '../CoinPicker';

class Dice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            betAmount: 0,
            payout: 2,
            betid: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getCoinNames();
    }

    componentWillReceiveProps(nextProps) {
        //Get coin balance
        if ((nextProps.loggedIn && nextProps.loggedIn != this.props.loggedIn) ||
            (nextProps.selectedCoin && this.props.selectedCoin && (nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName))) {
            this.setState({ balance: this.getBalance(nextProps) });
        }

        //Set min betAmount when changing coin
        if (!this.props.selectedCoin || nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName) {
            this.setBetAmount(nextProps.selectedCoin.min);
        }
        if ((nextProps.currentBet && nextProps.currentBet.userid == this.props.user.userid && nextProps.currentBet.betid != this.state.betid)) {
            this.setState({ betid: nextProps.currentBet.betid });
            this.receiveMyBet(nextProps.currentBet);
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
        if (result.profit > 0) {
            if (this.props.autoBet.numberOfRolls == 1) //Don't show notification when auto betting
                this.props.won(result.rollNum);
            this.setBalance(result.profit);

            return true;
        }
        else {
            if (this.props.autoBet.numberOfRolls == 1) //Don't show notification when auto betting
                this.props.lost(result.rollNum);
            this.setBalance(result.profit);

            return false;
        }

    }

    receiveMyBet(result) {
        const s = this.state;
        const p = this.props;
        let stop = false;

        const win = this.showResult(result);

        if (win) {
            if (p.autoBet.stopWin * 1 > 0 && s.betAmount >= p.autoBet.stopWin) {
                stop = true;
            }
            else if (p.autoBet.increaseOnWin == 0) {
                this.setState({ betAmount: (s.baseAmount * 1).toFixed(8) });
            }
            else {
                this.setState({ betAmount: (s.betAmount * (1 + p.autoBet.increaseOnWin / 100)).toFixed(8) });
            }
        }
        else {
            if (p.autoBet.stopLoss * 1 > 0 && s.betAmount >= p.autoBet.stopLoss) {
                stop = true;
            }
            else if (p.autoBet.increaseOnLose == 0) {
                this.setState({ betAmount: (s.baseAmount * 1).toFixed(8) });
            }
            else {
                this.setState({ betAmount: (s.betAmount * (1 + p.autoBet.increaseOnLose / 100)).toFixed(8) });
            }
        }

        if (!stop && (p.autoBet.numberOfRolls > 1 || p.autoBet.numberOfRolls == 0))
            this.roll(s.rollNum);

        this.endRoll();

    }

    endRoll() {
        if (this.props.autoBet.numberOfRolls == 1)
            this.props.endRoll();
    }
    getCoinNames() {
        if (!this.props.coins || this.props.coins.length == 0) {
            this.props.getCoinNames();
        }
    }
    getBalance(props) {
        const p = props;
        if (p.user.funds) {
            const fund = p.user.funds.find((fund) => { return fund.coinName == p.selectedCoin.coinName; });

            return fund ? (fund.depositAmount - fund.withdrawAmount + fund.profit * 1).toFixed(8) : 0;
        }
    }
    setBalance(profit) {
        this.setState({ balance: (this.state.balance * 1 + profit * 1).toFixed(8) });
    }
    refreshBalance() {
        if (this.props.loggedIn)
            this.props.refreshBalance();
        else
            this.props.userNotLoggedin();
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
            this.props.userNotLoggedin();
            return;
        }
        if (this.state.betAmount > this.getBalance(this.props)) {
            this.props.fundNotEnough();
            return;
        }
        this.setState({ rollNum });
        if (this.props.autoBet.numberOfRolls >= 1)
            this.props.roll(this.state.betAmount, rollNum, this.props.selectedCoin.coinName);
    }
    setBetAmount(betAmount) {
        this.setState({ betAmount: betAmount.toFixed(8), baseAmount: betAmount.toFixed(8) });
        this.props.setBetAmount(betAmount);
    }

    render() {
        const p = this.props;
        const coinName = p.selectedCoin ? p.selectedCoin.coinName : "";
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
                    <div className="col-xs-5 col-sm-4 col-sm-offset-2">
                        <button className="btn btn-success btn-perspective" disabled={this.props.isRolling} onClick={() => { this.roll(rollOver); }} >Over {rollOver}</button>
                    </div>

                    <div className="col-xs-5 col-sm-4">
                        <button className="btn btn-danger btn-perspective" disabled={this.props.isRolling} onClick={() => { this.roll(rollUnder); }}  >Under {rollUnder}</button>
                    </div>
                </div>
            </div>
        );

    }
}

Dice.propTypes = {
    //functions
    getCoinNames: PropTypes.func,
    refreshBalance: PropTypes.func,
    roll: PropTypes.func,
    endRoll: PropTypes.func,
    setBetAmount: PropTypes.func,
    userNotLoggedin: PropTypes.func,
    fundNotEnough: PropTypes.func,
    won: PropTypes.func,
    lost: PropTypes.func,
    //properties
    coins: PropTypes.array,
    selectedCoin: PropTypes.object,
    loggedIn: PropTypes.bool,
    user: PropTypes.object,
    autoBet: PropTypes.object,
    currentBet: PropTypes.object,
    isRolling: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        coins: state.dice.coins,
        selectedCoin: state.dice.selectedCoin,
        loggedIn: state.user.isLoggedIn,
        user: state.user,
        autoBet: state.dice.autoBet,
        isRolling: state.dice.isRolling,
        currentBet: state.dice.currentBet
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        won: (rollNum) => dispatch({ type: 'SUCCESS', title: 'You won', message: 'Dice:' + rollNum + '.' }),
        lost: (rollNum) => dispatch({ type: 'ERROR', title: 'You lost', message: 'Dice:' + rollNum + '.' }),
        userNotLoggedin: () => dispatch({ type: 'USER_NOT_LOGGEDIN' }),
        fundNotEnough: () => dispatch({ type: 'WARNING', title: 'Fund not enough', message: 'Your balance is not enough. Deposit more fund.' }),
        getCoinNames: () => dispatch({ socket: 'dice', type: 'GET_COINNAMES' }),
        refreshBalance: () => dispatch({ socket: 'dice', type: 'REFRESH_BALANCE' }),
        endRoll: () => dispatch({ type: 'END_ROLL' }),
        setBetAmount: (betAmount) => dispatch({ type: 'SET_BETAMOUNT', betAmount }),
        roll: (betAmount, selectedNumber, coinName) => dispatch({ socket: 'dice', type: 'ROLL', bet: { w: betAmount, sn: selectedNumber, coinName } })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dice);
