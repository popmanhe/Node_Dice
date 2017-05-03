import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../lib/jquery.nicescroll.min';

class Chat extends React.Component {
      constructor(props) {
            super(props);
            this.sendMsg = this.sendMsg.bind(this);
      }

      componentDidMount() {
            this.props.onGetChats();
            $('#chatList').niceScroll({
                  cursorcolor: "#121212",
                  cursorborder: "0px solid #fff",
                  cursorborderradius: "0px",
                  cursorwidth: "5px",
                  cursoropacitymax: 0.2
            });
      }
       
      componentDidUpdate(/*prevProps, prevState*/) {
            this.scrollToBottom();
      }
      // componentWillUnmount() {
      //       this.leaveChat();
      // }

      // leaveChat() {
      //       //   socket.close();
      //       console.log('leaveChat');
      // }

      initChat() {
            this.props.onGetChats();
      }
      scrollToBottom() {
            const container = $('#chatList');
            container.animate({ scrollTop: container.height() + 20000 }, 2000);
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
                  <div>
                        <ul id="chatList" className="list-group" style={{ "maxHeight": "600px", "overflowY": "auto" }}>
                              {
                                    messages.map((msg, i) =>
                                          <li className="list-group-item" key={i}>
                                                <span>{msg.timeStamp}</span> <span className="text-danger" >{msg.userName}</span>:
                                                <div className="text-info" >{msg.message}</div>
                                          </li>
                                    )}

                        </ul>
                        <form onSubmit={this.sendMsg} className="the-box">
                              <div className="form-group">
                                    <label>Message:</label>
                                    <input type="text" ref={(input) => { this.newMessage = input; }} className="form-control rounded" placeholder="Enter message" />
                              </div>

                              <button type="submit" disabled={!this.props.enabled} onClick={this.sendMsg} className="btn btn-primary">Send</button>
                        </form>
                  </div>);
      }
}
Chat.propTypes = {
      onSendMessage: PropTypes.func,
      onGetChats: PropTypes.func,
      messages: PropTypes.arrayOf(PropTypes.shape({
            userName: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            timeStamp: PropTypes.string.isRequired
      }).isRequired),
      userName: PropTypes.string,
      enabled: PropTypes.bool
};

const mapStateToProps = (state) => {
      return {
            messages: state.chat.messages,
            enabled: state.user.isLoggedIn
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            onGetChats: () => dispatch({ socket: 'dice', type: 'GET_CHATS' }),
            onSendMessage: (text) => dispatch({ socket: 'dice', type: 'SEND_MESSAGE', message: text })

      };

};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);