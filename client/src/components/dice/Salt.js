import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { socketOn } from '../../utils/diceSocketHelper';
import R from 'ramda';
import { show } from '../../utils/notifications';
class Salt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientSalt: "",
            preClientSalt: "",
            preServerSalt: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const self = this;
        socketOn('clientSalt', function (data) {
            if (data.error) {
                show('ERROR',data.error, 'error');
            }
            else {
                self.setState({ preClientSalt: data.clientSalt, preServerSalt: data.serverSalt });
                show('','Client salt has been updated.');
            }
        });
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ clientSalt: nextProps.clientSalt ? nextProps.clientSalt : this.props.clientSalt });
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div className="the-box">
                <div className="form-group">
                    <label>Client Salt</label>
                    <div className="input-group">
                        <input type="text" className="form-control" name="clientSalt" onChange={this.handleChange} value={this.state.clientSalt} />
                        <span className="input-group-addon hand glyphicon glyphicon-floppy-disk" title="Update client salt" onClick={() => this.props.saveClientSalt(this.state.clientSalt)} />
                    </div>
                </div>
                <label>Server Salt</label>
                <p style={{ wordBreak: "break-all" }}>{this.props.hashedServerSalt}</p>
                <hr />
                <div>
                    <label>Previous Client Salt</label>
                    <p style={{ wordBreak: "break-all" }} >{this.state.preClientSalt}</p>
                    <label>Previous Server Salt</label>
                    <p style={{ wordBreak: "break-all" }} >{this.state.preServerSalt}</p>
                </div>
                <hr /> <p data-bind="html: rule" />
            </div>
        );
    }
}

Salt.propTypes = {
    clientSalt: PropTypes.string,
    hashedServerSalt: PropTypes.string,
    saveClientSalt: PropTypes.func,
    handleChange: PropTypes.func
};
const mapStateToProps = state => {
    const { clientSalt, hashedServerSalt } = state.user;
    return { clientSalt, hashedServerSalt };
};

const mapDispatchToProps = dispatch => {
    return {
        saveClientSalt: (clientSalt) => { if (clientSalt && R.trim(clientSalt) != "") dispatch({ "type": "SAVE_CLIENTSALT", clientSalt: R.trim(clientSalt) }); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Salt);


