import React from 'react';

class AutoBet extends React.Component {
    constructor(){
    super();

    }

render(){
    return (

<div className="the-box bg-cover">
    <strong className="font-large">Auto Betting Options</strong>
    <div className="form-group">
        <label htmlFor="numofrolls">Number of Rolls(0=unlimited)</label>
        <div className="input-group">
            <input className="form-control" data-bind="value: numberofRolls" id="numofrolls" />
            <span className="input-group-addon hand" data-bind="click: incRolls">+</span>
            <span className="input-group-addon hand" data-bind="click: decRolls">-</span>
        </div>
    </div>
    <div className="form-group">
        <label htmlFor="stopatprofit">Stop when winning</label>
        <div className="input-group">
            <span className="input-group-addon">
                <span className="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName" />
              <span className="caret" />
            </span>
            <input className="form-control" data-bind="value: stopWin" id="stopatprofit" />
        </div>
    </div>
    <div className="form-group">
        <label htmlFor="stopatloss">Stop when losing</label>
        <div className="input-group">
            <span className="input-group-addon">
                <span className="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName" />
                 <span className="caret" />
            </span>
            <input className="form-control" data-bind="value: stopLoss" id="stopatloss" />
        </div>
    </div>
    <div className="form-group">
        <label htmlFor="stopatloss">Increase on loss(0=return to base)</label>
        <div className="input-group">
            <input className="form-control" data-bind="value: incWin" id="stopatloss" />
            <span className="input-group-addon hand">%</span>
        </div>
    </div>
    <div className="form-group">
        <label htmlFor="stopatloss">Increase on win(0=return to base)</label>
        <div className="input-group">
            <input className="form-control" data-bind="value: incLoss" id="stopatloss" />
            <span className="input-group-addon hand">%</span>
        </div>
    </div>
</div>

    );

    }
}

export default AutoBet;