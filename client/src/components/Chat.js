import React from 'react';
class Chat extends React.Component {
      constructor(props) {
            super(props);

      }


      sendMsg = () => {

      }
      render() {
          //  const p = this.props;
            const s = this.state || {};
            return (
                  <div className="col-sm-12 action-chat" id="chatBox">
                        <ul className="list-group" id="chatList" data-bind="foreach: {data: chatArray, afterAdd: chatFadeIn}">
                              <li className="chat-item list-group-item">
                                    <span data-bind="text: chatTime" /> <span data-bind="text: chatUser" className="text-danger" />: <br />
                                    <label className="text-info" data-bind="text: chatMsg" />
                              </li>
                        </ul>
                        <hr />
                        <form onSubmit={this.sendMsg}>
                              <div className="form-group">
                                    <label>Message:</label>
                                    <input type="text" value={s.value} className="form-control rounded" placeholder="Enter message" />
                              </div>

                              <button type="button" onClick={this.sendMsg} className="btn btn-default">Send</button>
                        </form>
                  </div>);
      }
}

export default Chat;