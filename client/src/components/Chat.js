import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

class Chat extends React.Component {
      constructor(props) {
            super(props);
            this.sendMsg = this.sendMsg.bind(this);
            this.handleInputMessage = this.handleInputMessage.bind(this);
            //           this.props.messages = props.messages || [];
            this.state = { messages: [], message: '' };
      }

      handleInputMessage(e) {
            this.setState({ message: e.target.value });
      }
      sendMsg(e) {
            e.preventDefault();
            //       dispatch()
            if (this.state.message != '')
            {
                  this.props.onSendMessage(this.state.message);
             this.setState({ message:'' });
            }
      }
      render() {
            //            const p = this.props;
            const s = this.state || {};
            let input;
            return (
                  <div className="col-sm-12 action-chat" id="chatBox">
                        <ul className="list-group" id="chatList">
                              {
                                    s.messages.map(msg =>
                                          <li className="chat-item list-group-item" key={msg.id}>
                                                <span data-bind="text: chatTime" /> <span data-bind="text: chatUser" className="text-danger" />: <br />
                                                <label className="text-info" >{msg.text}</label>
                                          </li>
                                    )}

                        </ul>
                        <hr />
                        <form onSubmit={e => this.sendMsg(e, input.value)}>
                              <div className="form-group">
                                    <label>Message:</label>
                                    <input type="text" value={this.state.message} onChange={this.handleInputMessage} className="form-control rounded" placeholder="Enter message" />
                              </div>

                              <button type="submit" onClick={this.sendMsg} className="btn btn-default">Send</button>
                        </form>
                  </div>);
      }
}
Chat.propTypes = {
      onSendMessage: PropTypes.func.isRequired,
      messages: PropTypes.array
};

const mapStateToProps = (state) => {
      return {
            messages: state.messages
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            onSendMessage: (message) => dispatch({ type: 'SEND_MESSAGE', text: message, messageId: uuid.v4, messageTimeStamp: new Date() })
      };

};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);