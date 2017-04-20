
const configureDev = {
    diceSocketUrl: 'http://' + window.location.hostname + ':3000/',
    raffleSocketUrl: 'http://' + window.location.hostname + ':3100/'
};

const configureProd = {
    diceSocketUrl: 'http://' + window.location.hostname + ':3000/', //assume client and server are running at the same address
    raffleSocketUrl: 'http://' + window.location.hostname + ':3100/'
};

const config = process.env.NODE_ENV === 'production' ? configureProd : configureDev;

export default config; 