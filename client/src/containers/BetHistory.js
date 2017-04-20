import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BetList from '../components/dice/BetList';
import { socketEmit, socketOn } from '../utils/diceSocketHelper';
import moment from 'moment';
class BetHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBets: [],
            allBets: [],
            highRollers: []
        };

        this.addToHistory = this.addToHistory.bind(this);
    }

    componentDidMount() {
        const self = this;
        socketEmit('getAllBets');
        socketOn('getAllBets', (bets) => {
            bets.forEach((bet) => {
                self.addToHistory(bet);
            });
        });
        socketOn('allBets', (bet) => {
            self.addToHistory(bet);
        });
    }
    addToHistory(bet) {
        bet.betTime = moment(bet.betTime).format('MM-DD HH:mm:ss');

        //add bet to mybets list
        if (bet.userid == this.props.user.userid) {
            this.setState({ myBets: this.addToList(bet, this.state.myBets) });
        }
        //add bet to allbets list
        this.setState({ allBets: this.addToList(bet, this.state.allBets) });
        //add high rollers to the list
        if (bet.amount >= 0.001)
            bet.setState({ highRollers: this.addToList(bet, this.state.highRollers) });

    }

    addToList(bet, list) {
        let bets = list.slice(0, 99);
        bets.unshift(bet);

        return bets;
    }

    render() {
        return (
            <div >
                <div className="panel with-nav-tabs panel-default">
                    <div className="panel-heading">
                        <ul className="nav nav-tabs nav-justified">
                            <li><a href="#tab1" data-toggle="tab">My bets</a></li>
                            <li className="active"><a href="#tab2" data-toggle="tab">All bets</a></li>
                            <li><a href="#tab3" data-toggle="tab">High Rollers</a></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade in" id="tab1">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive the-box">
                                        <BetList betList={this.state.myBets} showUserName={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade in active" id="tab2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive the-box">
                                        <BetList betList={this.state.allBets} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade in" id="tab3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive the-box">
                                        <BetList betList={this.state.highRollers} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

BetHistory.propTypes = {
    user: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};
export default connect(mapStateToProps)(BetHistory);

