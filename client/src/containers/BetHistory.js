import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BetList from '../components/BetList';
import { socketOn } from '../utils/socketIoHelper';
import moment from 'moment';
class BetHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBets: [],
            allBets: [],
            highRollers: []
        };
    }
    componentDidMount() {
        const self = this;
        socketOn('allBets', function (result) {
            result.betTime = moment(result.betTime).format('MM-DD HH:mm:ss');

            //add bet to mybets list
            if (result.userid == self.props.user.userid) {
                self.setState({ myBets: self.addToList(result, self.state.myBets) });
            }
            //add bet to allbets list
            self.setState({ allBets: self.addToList(result, self.state.allBets) });
            //add high rollers to the list
            if (result.amount >= 0.001)
                self.setState({ highRollers: self.addToList(result, self.state.highRollers) });
        });
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

