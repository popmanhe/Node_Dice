import React,{PropTypes} from 'react';

const CoinPicker =  ({coin})=>{

    return (
       <a >{coin}</a>
    );

};
CoinPicker.propTypes = {
  coin :PropTypes.string.isRequired
};
export default CoinPicker;