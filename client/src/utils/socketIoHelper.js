import io from "socket.io-client";
import config from "../config";
import reactCookie from 'react-cookie';
import uuid from 'uuid';

const getSessionID = () =>{
    let id = reactCookie.load('diceSessionID');
    if (!id)
    {
        id = uuid.v4();
        reactCookie.save('diceSessionID', id, {path: '/', httpOnly: true});
    }
    return id;
};

console.info(getSessionID());
console.info(getSessionID());

const socket = io.connect(config.socketUrl,
            {
                transports: ['websocket'],
                extraHeaders : "foo=bar"
            }
        );

export const socketOn = (event, fn) => socket.on(event, fn);
export const socketEmit = (event, data) => {
    data = data || {};
    data.sessionID = reactCookie.load('sessionID');
    socket.emit(event, data);
};



