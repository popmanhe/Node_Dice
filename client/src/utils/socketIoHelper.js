import io from "socket.io-client";
import config from "../config";

const socket = io.connect(config.socketUrl,
    {
        transports: ['websocket']
    }
);

export default socket;