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
            <li key={i}> <a href="#" onClick={(e) =>{e.preventDefault(); this.props.onChangeCoin(coin);}}>{coin}</a> </li>
          )}
      </ul>
    );
  }
}

CoinPicker.propTypes = {
  onChangeCoin: PropTypes.func,
  coins: PropTypes.array
};
const mapStateToProps = (state) => {
  return {
    coins: state.ou.coins
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCoin: (coinName) => {dispatch({ type: 'CHANGE_COIN', coinName: coinName });}
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinPicker);