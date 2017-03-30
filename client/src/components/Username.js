import React, { PropTypes } from 'react';

const Username = (props) => {
    return (
        <span> Hi, {props.userName}</span>
    );

};
Username.propTypes = {
    userName: PropTypes.string
};
export default Username;