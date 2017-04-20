import React,{PropTypes } from 'react';


const propTypes = {
    gameTotalAmount: PropTypes.number,
    gameCount: PropTypes.number,
    biggestPot: PropTypes.number
};

const defaultProps = {
    gameTotalAmount: 0,
    gameCount: 0,
    biggestPot: 0
};

const GameInfo = (props) => (
    <div className="row">
        <div className="col-sm-3">
            <div className="the-box rounded  text-center">
                <h4 className="light">Minimum Deposit: 0.0001 btc</h4>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="the-box rounded text-center">
                <h4 className="light">Total Today:  {props.gameTotalAmount} btc</h4>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="the-box rounded text-center">
                <h4 className="light">Games Today:  {props.gameCount} </h4>
            </div>
        </div>
        <div className="col-sm-3">
            <div className="the-box rounded text-center">
                <h4 className="light">Biggest Pot:  {props.biggestPot} </h4>
            </div>
        </div>
    </div>

);

GameInfo.propTypes = propTypes;

GameInfo.defaultProps = defaultProps;

export default GameInfo;
