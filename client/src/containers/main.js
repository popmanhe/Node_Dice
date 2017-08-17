import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.element
};

const defaultProps = {};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
               {this.props.children}
            </div>
        );
    }
}

Main.propTypes = propTypes;

Main.defaultProps = defaultProps;

export default Main;
