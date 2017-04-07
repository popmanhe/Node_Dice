
const configureDev = {
    socketUrl: 'http://' + window.location.hostname + ':3000/'
};

const configureProd = {
    socketUrl: 'http://' + window.location.hostname + ':4000/' //assume client and server are running at the same address
};

const config = process.env.NODE_ENV === 'production' ? configureProd : configureDev;

export default config; 