import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from './CoinPicker';
import { socketOn } from '../utils/socketIoHelper';
class OUBet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            betAmount: 0,
            payout: 2,
            notLoggedin: "Please login or sign up first."
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.getCoinNames();
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props);
        // console.log(nextProps);
        //Get coin balance
        if (nextProps.loggedIn && ((nextProps.loggedIn != this.props.loggedIn) ||
            (nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName))) {
            this.getBalance(nextProps.selectedCoin.coinName);
        }
        //Set min betAmount
        if (!this.props.selectedCoin || nextProps.selectedCoin.coinName != this.props.selectedCoin.coinName) {
            this.setState({ betAmount: nextProps.selectedCoin.min.toFixed(8) });
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
    getCoinNames() {
        if (!this.props.coins || this.props.coins.length == 0) {
            this.props.getCoinNames();
            socketOn('coinNames', (result) => { this.props.setCoinNames(result); });
        }
    }

    getBalance(coinName) {
        if (coinName) {
            this.props.refreshBalance(coinName);
            socketOn('getBalance', (result) => this.setState({ balance: result }));
        }
    }
    refreshBalance() {
        if (this.props.loggedIn)
            this.getBalance(this.props.selectedCoin.coinName);
        else
            alert(this.state.notLoggedin);
    }
    multiplyAmount(n) {

        let betAmount = this.state.betAmount * n;
        betAmount = Math.min(betAmount, this.props.selectedCoin.max);
        betAmount = Math.max(betAmount, this.props.selectedCoin.min);

        if (betAmount >= this.props.selectedCoin.min && betAmount <= this.props.selectedCoin.max)
            this.setState({ betAmount: betAmount.toFixed(8) });
    }
    minBetAmount() {
        this.setState({ betAmount: this.props.selectedCoin.min.toFixed(8) });
    }
    maxBetAmount() {
        this.setState({ betAmount: this.props.selectedCoin.max.toFixed(8) });
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
    render() {
        const coinName = this.props.selectedCoin ? this.props.selectedCoin.coinName : "";
        const profitOnWin = (this.state.betAmount * (this.state.payout-1)).toFixed(8);

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
                        <button className="btn btn-success btn-perspective btn-lg" >Over {rollOver}</button>
                    </div>

                    <div className="col-sm-4">
                        <button className="btn btn-danger btn-perspective btn-lg" >Under {rollUnder}</button>
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
        getCoinNames: () => dispatch({ type: 'GET_COINNAMES' }),
        setCoinNames: (coins) => dispatch({ type: 'SET_COINNAMES', coins }),
        refreshBalance: (coinName) => dispatch({ type: 'REFRESH_BALANCE', coinName })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OUBet);
