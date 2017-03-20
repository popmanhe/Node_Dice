import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
// import { getFormattedDateTime } from '../utils/dateHelper';
import socket from '../utils/socketIoHelper';
import moment from 'moment';

class Chat extends React.Component {
      constructor(props) {
            super(props);
            this.sendMsg = this.sendMsg.bind(this);
      }
       
      componentDidMount(){
           this.receiveChats();
      }
      componentWillUnmount (){
            this.leaveChat();
      }

      leaveChat(){
            socket.close();
      }
      receiveChats() { 
            socket.on('recvChat', (result) => {
            this.props.onReceiveMessage({ timeStamp: moment(result.timeStamp).format('MM-DD HH:mm'), message: result.message,  messageId: result.messageId });
        
       // chat.scrollToBottom();
    });
}

      sendMsg(e) {
            e.preventDefault();
            
            if (this.newMessage.value != '') {
                  this.props.onSendMessage(this.newMessage.value);
                  this.newMessage.value = '';
                  this.newMessage.focus();
            }
      }
      render() {
            
            const p = this.props;
            const messages = (p && p.messages) || [];

            return (
                  <div className="col-sm-12 action-chat" id="chatBox">
                        <ul className="list-group" id="chatList">
                              {
                                    messages.map((msg) =>
                                          <li className="chat-item list-group-item" key={msg.messageId}>
                                                <span>{msg.timeStamp}</span> <span className="text-danger" >{msg.messageId}</span>: <br />
                                                <label className="text-info" >{msg.message}</label>
                                          </li>
                                    )}

                        </ul>
                        <hr />
                        <form onSubmit={this.sendMsg}>
                              <div className="form-group">
                                    <label>Message:</label>
                                    <input type="text" ref={(input) => { this.newMessage = input; }} className="form-control rounded" placeholder="Enter message" />
                              </div>

                              <button type="submit" onClick={this.sendMsg} className="btn btn-default">Send</button>
                        </form>
                  </div>);
      }
}
Chat.propTypes = {
      onSendMessage: PropTypes.func,
      onReceiveMessage: PropTypes.func,
      messages: PropTypes.arrayOf(PropTypes.shape({
            messageId: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            timeStamp: PropTypes.string.isRequired
      }).isRequired),
      newMessage: PropTypes.string,
      userName: PropTypes.string
};

const mapStateToProps = (state) => {
      return {
            messages: state.chat.messages
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            onSendMessage: (text) => dispatch({ type: 'SEND_MESSAGE', message: text, messageId: uuid.v4()}),
            onReceiveMessage: (message) => dispatch({ type: 'RECV_MESSAGE', message: message })
      };

};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);