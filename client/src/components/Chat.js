import React from 'react';

const Chat = () => {

      return (
            <div className="col-sm-12 action-chat" id="chatBox">
                  <ul className="list-group" id="chatList"   data-bind="foreach: {data: chatArray, afterAdd: chatFadeIn}">
                        <li className="chat-item list-group-item">
                              <span data-bind="text: chatTime" /> <span data-bind="text: chatUser" className="text-danger" />: <br />
                              <label className="text-info" data-bind="text: chatMsg" />
                        </li>
                  </ul>
                  <hr />
                  <form data-bind="submit: sendMsg">
                        <div className="form-group">
                              <label>Message:</label>
                              <input type="text" data-bind="value: enterMsg" className="form-control rounded" placeholder="Enter message" />
                        </div>

                        <button type="button" data-bind="click: sendMsg, enable: chatButtonEnable" className="btn btn-default">Send</button>
                  </form>
            </div>
      );
};

export default Chat;