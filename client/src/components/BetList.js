import React, { PropTypes } from 'react';

const propTypes = {
    betList: PropTypes.array,
    showUserName: PropTypes.bool
};

const BetList = (props) => {

    return (
        <table className="table table-th-block table-hover">
            <thead>
                <tr>
                    {props.showUserName && <th>Name</th>}
                    <th>Time</th>
                    <th>Bet on</th>
                    <th>Lucky Number</th>
                    <th>Wager</th>
                    <th>Payout</th>
                    <th>Profit</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.betList.map((bet, i) =>
                        <tr key={i}>
                            {props.showUserName && <td>{bet.userName}</td>}
                            <td>{bet.betTime}</td>
                            <td>{bet.selNum >= 50.49 ? 'Over ' + bet.selNum : 'Under ' + bet.selNum}</td>
                            <td>
                                <p className="text-danger">{bet.rollNum}</p>
                            </td>
                            <td>{bet.amount.toFixed(8)}</td>
                            <td>{bet.payout.toFixed(0)}x</td>
                            <td className={bet.profit < 0 ? 'text-danger' : 'text-success'}><strong>{bet.profit.toFixed(8)}</strong></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};
BetList.propTypes = propTypes;
BetList.defaultProps = {
    betList: [],
    showUserName: true
};

export default BetList;
