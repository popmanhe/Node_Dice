import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BetList from '../components/dice/BetList';

class BetHistory extends Component {
    constructor(props) {
        super(props);
        // this.addToHistory = this.addToHistory.bind(this);
    }

    componentDidMount() {

        this.props.getAllBets();

        // socketOn('allBets', (bet) => {
        //     self.setState({ sort: 1 });
        //     self.addToHistory(bet);
        // });
    }
    // componentWillReceiveProps(nextProps) {

    //     if (this.props.allBets.length == 0 && nextProps.allBets.length > 0) {
    //         //initial bet history loading
    //         this.setState({ allBets: nextProps.allBets });
    //         this.setState({ highRollers: nextProps.allBets.filter((bet) => { return bet.amount >= 0.001; }) });
    //     }
    //     else if (this.props.allBets.length > 0 && nextProps.allBets.length > 0) {

    //     }
    // }
    // addToHistory(bet) {
    //     // bet.betTime = moment(bet.betTime).format('MM-DD HH:mm:ss');

    //     //add bet to mybets list
    //     if (bet.userid == this.props.user.userid) {
    //         this.setState({ myBets: this.addToList(bet, this.state.myBets) });
    //     }
    //     //add bet to allbets list
    //     this.setState({ allBets: this.addToList(bet, this.state.allBets) });
    //     //add high rollers to the list
    //     if (bet.amount >= 0.001)
    //         this.setState({ highRollers: this.addToList(bet, this.state.highRollers) });

    // }

    addToList(bet, list) {
        let bets = list.slice(0, 99);
        bets.unshift(bet);

        return bets;
    }

    render() {
        const myBets = this.props.user.userid == null ? [] : this.props.allBets.filter((bet) => { return bet.userid == this.props.user.userid; });
        const highRollers = this.props.allBets.filter((bet) => { return bet.amount >= 0.001; });
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
                                        <BetList betList={myBets} showUserName={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade in active" id="tab2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive the-box">
                                        <BetList betList={this.props.allBets} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade in" id="tab3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="table-responsive the-box">
                                        <BetList betList={highRollers} />
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
    user: PropTypes.object,
    allBets: PropTypes.array,
    getAllBets: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        allBets: state.dice.allBets
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBets: () => dispatch({ socket: 'dice', type: 'GET_ALLBETS' })

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BetHistory);

