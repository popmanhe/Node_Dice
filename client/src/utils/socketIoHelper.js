import io from "socket.io-client";
import config from "../config";

const socket = io.connect(config.socketUrl,
    {
        transports: ['websocket']
    }
);

export const socketOn = (event, fn) => { socket.on(event, fn); };
export const socketEmit = (event, data) => { socket.emit(event, data); };



