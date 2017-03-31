import React, { PropTypes } from 'react';
// import $ from 'jquery';
// import 'icheck/icheck';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    //  componentDidMount() {
    //     $(`input[name=${this.props.name}]`).iCheck({
    //         checkboxClass: 'icheckbox_flat-yellow',
    //         radioClass: 'iradio_flat-yellow',
    //         increaseArea: '20%'
    //     });
    // }

    render() {
        return (
            <input type="checkbox" onClick={this.props.onChange}  name={this.props.name} className={this.props.className} />
        );
    }
}
Checkbox.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};
export default Checkbox;