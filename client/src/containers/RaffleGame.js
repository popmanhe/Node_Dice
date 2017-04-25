import React, { Component } from 'react';
import Chat from '../components/Chat';
import GameInfo from '../components/raffle/GameInfo';
import LobbySelection from '../components/raffle/LobbySelection';
// import BetHistory from '../components/raffle/BetHistory';

const propTypes = {};

const defaultProps = {};

class RaffleGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <GameInfo />
                    <div className="row ">
                        <div className="col-md-9">
                            <LobbySelection />
                            {/*<BetHistory />*/}
                        </div>
                        <div className="col-md-3">
                            <Chat />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RaffleGame.propTypes = propTypes;

RaffleGame.defaultProps = defaultProps;

export default RaffleGame;
