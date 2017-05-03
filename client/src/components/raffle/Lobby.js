import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CountDown from './CountDown';
import * as notifications from '../../utils/notifications';

const propTypes = {
    lobbyId: PropTypes.string,
    max: PropTypes.number,
    minimum: PropTypes.number,
    loggedIn: PropTypes.bool,
    buyTickets: PropTypes.func,
    getLobby: PropTypes.func
};

const defaultProps = {
};

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1,
            startCountdown: false,
            resetCountdown: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.buyTickets = this.buyTickets.bind(this);
        this.startCountdown = this.startCountdown.bind(this);
        this.resetCountdown = this.resetCountdown.bind(this);
    }
    componentDidMount() {
        this.props.getLobby(this.props.lobbyId);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value * 1;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    buyTickets() {
        if (!this.props.loggedIn) {
            notifications.UserNotLoggedin();
            return;
        }
        this.props.buyTickets(this.state.amount, this.props.lobbyId);
    }

    startCountdown() {
        this.setState({ startCountdown: true });
    }
    resetCountdown() {
        this.setState({ resetCountdown: true });
    }
    increaseTicket() {
        if (this.state.amount + 1 <= this.props.max)
            this.setState({ amount: this.state.amount + 1 });
    }
    decreaseTicket() {
        if (this.state.amount - 1 > 0)
            this.setState({ amount: this.state.amount - 1 });
    }
    render() {
        const p = this.props;
        return (
            <div>
                <div className="col-sm-4">
                    <div className="input-group">
                        <span className="input-group-addon">{p.minimum} BTC x </span>
                        <input type="text" name="amount" className="form-control lobbyAmount" placeholder="Number of tickets" onChange={this.handleChange} value={this.state.amount} />
                        <span className="input-group-addon hand" onClick={() => this.increaseTicket()}>+</span>
                        <span className="input-group-addon hand" onClick={() => this.decreaseTicket()}>-</span>
                        <span className="input-group-addon add-on bg-success btnBuy hand" onClick={() => this.buyTickets()}><i className="fa fa-clock-o" /> BUY</span>
                    </div>
                    <span className="small-title text-danger"> Max tickets per player is {p.max}</span>
                    <CountDown started={this.state.startCountdown} reset={this.state.resetCountdown} />
                    <h3>Total pot: <span className="lobbyTotal">0</span> btc</h3>
                </div>
                <div className="col-sm-6">
                    <h3 style={{ marginTop: "0px" }}>Participants (<span className="numOfParticipants">0</span>)</h3>
                    <hr />
                    <ul className="list-group info  lobbyParticipant" />
                    <div className="alert alert-success fade in alert-dismissable lobbyWinner" style={{ display: "none" }}>
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <strong className="winnerName" />
                    </div>
                </div>
            </div>
        );
    }
}

Lobby.propTypes = propTypes;

Lobby.defaultProps = defaultProps;
const mapStateToProps = (state) => {
    return {
        coins: state.raffle.coins,
        selectedCoin: state.raffle.selectedCoin,
        loggedIn: state.user.userName != null,
        user: state.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        buyTickets: (amount, lobbyId) => dispatch({
            socket: 'raffle', type: 'BUY_TICKETS', amount, lobbyId
        }),
        getLobby: (lobbyId) => dispatch({
            socket: 'raffle', type: 'GET_LOBBY', lobbyId
        }),

    };

};
export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
