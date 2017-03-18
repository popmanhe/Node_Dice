
const configureDev = {
    socketUrl: "http://localhost:3000/"
};

const configureProd = { 
    socketUrl: "http://localhost:3000/"
};

const config  = process.env.NODE_ENV === 'production' ? configureProd : configureDev;

export default config; 