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
            notLoggedin: "Please login or sign up first."
        };
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
        
        if (betAmount >= this.props.selectedCoin.min && betAmount<=this.props.selectedCoin.max)
            this.setState({ betAmount: betAmount.toFixed(8) });
    }
    minBetAmount() {
        this.setState({ betAmount: this.props.selectedCoin.min.toFixed(8) });
    }
    maxBetAmount() { 
         this.setState({ betAmount: this.props.selectedCoin.max.toFixed(8) });
    }
    render() {
        const coinName = this.props.selectedCoin ? this.props.selectedCoin.coinName : "";

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
                        <input className="form-control" value={this.state.betAmount} min="0,00000001" />
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
                        <input className="form-control" />
                        <span className="input-group-addon hand">+</span>
                        <span className="input-group-addon hand">-</span>
                    </div>
                    <p className="text-danger" data-bind="validationMessage: payout" />

                </div>
                <div className="form-group">
                    <label>PROFIT ON WIN</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{coinName}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" readOnly="readonly" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <button className="btn btn-success btn-perspective btn-lg" >Over</button>
                    </div>

                    <div className="col-sm-4">
                        <button className="btn btn-danger btn-perspective btn-lg" >Under</button>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-warning btn-perspective btn-lg" >Restart</button>
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
