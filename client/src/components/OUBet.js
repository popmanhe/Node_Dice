import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoinPicker from './CoinPicker';
import { socketOn } from '../utils/socketIoHelper';
class OUBet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            notLoggedin: "Please login or sign up first."
        };
    }
    componentDidMount() {
        this.getCoinNames();
    }


    componentWillReceiveProps(nextProps) {
        // console.log(this.props);
        // console.log(nextProps);
        if (nextProps.loggedIn && ((nextProps.loggedIn != this.props.loggedIn) ||
            (nextProps.selectedCoin != this.props.selectedCoin)))
            this.getBalance(nextProps.selectedCoin);

    }

    getCoinNames() {
        if (!this.props.coins || this.props.coins.length == 0) {
            this.props.getCoinNames();
            socketOn('coinNames', (result) => this.props.setCoinNames(result));
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
            this.getBalance(this.props.selectedCoin);
        else
            alert(this.state.notLoggedin);
    }
    render() {
        return (
            <div className="the-box">
                <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{this.props.selectedCoin}<span className="caret" /></a>
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
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{this.props.selectedCoin}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" data-bind="value: betAmount" min="0,00000001" />
                        <span className="input-group-addon hand" data-bind="click: amountX2">x 2</span>
                        <span className="input-group-addon hand" data-bind="click: amountDiv2">/ 2</span>
                        <span className="input-group-addon hand" data-bind="click: minAmount">Min</span>
                        <span className="input-group-addon hand" data-bind="click: maxAmount">Max</span>
                    </div>
                    <span className="help-block" data-bind="html: amountdesc" />
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
                            <a className="dropdown-toggle hand" data-toggle="dropdown">{this.props.selectedCoin}<span className="caret" /></a>
                            <CoinPicker />
                        </span>
                        <input className="form-control" readOnly="readonly" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <button className="btn btn-success btn-perspective btn-lg" />
                    </div>

                    <div className="col-sm-4">
                        <button className="btn btn-danger btn-perspective btn-lg" />
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-warning btn-perspective btn-lg" />
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
    selectedCoin: PropTypes.string,
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
