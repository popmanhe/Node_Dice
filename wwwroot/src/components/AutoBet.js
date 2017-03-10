import React from 'react';

class AutoBet extends React.Component {
    constructor(){
    super();

    }

render(){
    return (

<div class="the-box bg-cover">
    <strong class="font-large">Auto Betting Options</strong>
    <div class="form-group">
        <label for="numofrolls">Number of Rolls(0=unlimited)</label>
        <div class="input-group">
            <input class="form-control" data-bind="value: numberofRolls" id="numofrolls" />
            <span class="input-group-addon hand" data-bind="click: incRolls">+</span>
            <span class="input-group-addon hand" data-bind="click: decRolls">-</span>
        </div>
    </div>
    <div class="form-group">
        <label for="stopatprofit">Stop when winning</label>
        <div class="input-group">
            <span class="input-group-addon">
                <span class="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName"></span>
              <span class="caret"></span>
            </span>
            <input class="form-control" data-bind="value: stopWin" id="stopatprofit" />
        </div>
    </div>
    <div class="form-group">
        <label for="stopatloss">Stop when losing</label>
        <div class="input-group">
            <span class="input-group-addon">
                <span class="dropdown-toggle hand" data-toggle="dropdown" data-bind="text: coinName"></span>
                 <span class="caret"></span>
            </span>
            <input class="form-control" data-bind="value: stopLoss" id="stopatloss" />
        </div>
    </div>
    <div class="form-group">
        <label for="stopatloss">Increase on loss(0=return to base)</label>
        <div class="input-group">
            <input class="form-control" data-bind="value: incWin" id="stopatloss" />
            <span class="input-group-addon hand">%</span>
        </div>
    </div>
    <div class="form-group">
        <label for="stopatloss">Increase on win(0=return to base)</label>
        <div class="input-group">
            <input class="form-control" data-bind="value: incLoss" id="stopatloss" />
            <span class="input-group-addon hand">%</span>
        </div>
    </div>
</div>

    );

    }
}

export default AutoBet;