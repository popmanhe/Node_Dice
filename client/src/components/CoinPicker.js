import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const CoinPicker = (props) => {
  const c = props.coins || [];
  return (
    <ul className="dropdown-menu square primary margin-list-rounded with-triangle">
      {
        c.map((coin, i) =>
          <li key={i}> <a href="#" onClick={(e) => { e.preventDefault(); props.onChangeCoin(coin); }}>{coin.coinName}</a> </li>
        )}
    </ul>
  );
};

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