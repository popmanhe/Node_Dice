import io from "socket.io-client";
import config from "../config";
console.log('Connecting to web socket: ' + config.socketUrl);
const socket = io.connect(config.socketUrl,
    {
        transports: ['websocket']
    }
);
export const socketOn = (event, fn) => {
    const listeners = socket.listeners(event);
    //prevent the same handler is added more than once for an event
    const handler = listeners.find((_fn) => { return ''+_fn == ''+fn; });
    if (!handler)
        socket.on(event, fn);
};
export const socketEmit = (event, data) => {
    socket.emit(event, data);
};



