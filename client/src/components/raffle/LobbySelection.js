import React from 'react';
import Lobby from './Lobby';

const propTypes = {};

const defaultProps = {};

const LobbySelection = () => (
    <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">SELECT A LOBBY AND PLAY</h3>
        </div>
        <div className="panel-body">
            <div >
                <ul className="nav nav-tabs left-position col-sm-3 col-md-2">
                    <li className="active">
                        <a href="#a" data-toggle="tab">
                            0.0001 BTC / 10
                    </a>
                    </li>
                    <li>
                        <a href="#b" data-toggle="tab">
                            0.001 BTC / 10
                    </a>
                    </li>
                    <li>
                        <a href="#c" data-toggle="tab">
                            0.01 BTC / 10
                    </a>
                    </li>
                    <li>
                        <a href="#d" data-toggle="tab">0.0001 BTC / 100</a>
                    </li>
                    <li>
                        <a href="#e" data-toggle="tab">0.001 BTC / 100</a>
                    </li>
                    <li>
                        <a href="#f" data-toggle="tab">0.01 BTC / 100</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade in active" id="a">
                        <div id="lobby0">
                            <Lobby max={10} minimum={0.0001} lobbyId="1" />
                        </div>
                    </div>
                    <div className="tab-pane fade in" id="b">
                        <div id="lobby1">
                            <Lobby max={10} minimum={0.001} lobbyId="2" />
                        </div>
                    </div>
                    <div className="tab-pane fade in" id="c">
                        <div id="lobby2">
                            <Lobby max={10} minimum={0.01} lobbyId="3" />
                        </div>
                    </div>
                    <div className="tab-pane fade in" id="d">
                        <div id="lobby3">
                            <Lobby max={100} minimum={0.0001} lobbyId="4" />
                        </div>
                    </div>
                    <div className="tab-pane fade in" id="e">
                        <div id="lobby4">
                            <Lobby max={100} minimum={0.001} lobbyId="5" />
                        </div>
                    </div>
                    <div className="tab-pane fade in" id="f">
                        <div id="lobby5">
                            <Lobby max={100} minimum={0.01} lobbyId="6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

LobbySelection.propTypes = propTypes;

LobbySelection.defaultProps = defaultProps;

export default LobbySelection;
