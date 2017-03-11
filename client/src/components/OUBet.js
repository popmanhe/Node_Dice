import React from 'react';
import CoinPicker from './CoinPicker';

class OUBet extends React.Component {
    constructor(){
    super();

    }

render(){
    return (

        <div className="the-box">
            <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName" />
                        <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                            <li><CoinPicker coin="BTC" /> </li>
                            <li><CoinPicker coin="NTX" /> </li>
                        </ul> <span className="caret" />
                    </span>
                    <input type="text" data-bind="value: balance, click: copyBalance" className="form-control hand" readOnly="readonly" />
                    <span className="input-group-addon hand" data-bind="click: refreshBalance"><i className="fa fa-refresh" title="Refresh balance"/></span>
                </div>
            </div>
            <div className="form-group">
                <label>BET AMOUNT</label>
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName" />
                        <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                            <li><a data-bind="click: switchCoins.bind($data,'BTC')">BTC</a></li>
                            <li><a data-bind="click: switchCoins.bind($data,'NXT')">NXT</a></li>
                        </ul> <span className="caret" />
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
                    <span className="input-group-addon hand" data-bind="click: inc">+</span>
                    <span className="input-group-addon hand" data-bind="click: dec">-</span>
                </div>
                <p className="text-danger" data-bind="validationMessage: payout" />

            </div>
            <div className="form-group">
                <label>PROFIT ON WIN</label>
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName" />
                        <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
                            <li><a data-bind="click: switchCoins.bind($data,'BTC')">BTC</a></li>
                            <li><a data-bind="click: switchCoins.bind($data,'NXT')">NXT</a></li>
                        </ul> <span className="caret" />
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

export default OUBet;