import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class CoinPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const c = this.props.coins || [];
    return (
      <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
        {
          c.map((coin, i) =>
            <li key={i}> <a href="#" onClick={(e) => { e.preventDefault(); this.props.onChangeCoin(coin); }}>{coin.coinName}</a> </li>
          )}
      </ul>
    );
  }
}

CoinPicker.propTypes = {
  onChangeCoin: PropTypes.func,
  coins: PropTypes.arrayOf(PropTypes.shape({
    coinName: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  }

  ))
};
const mapStateToProps = (state) => {
  return {
    coins: state.ou.coins
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCoin: (coin) => { dispatch({ type: 'CHANGE_COIN', coin }); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinPicker);