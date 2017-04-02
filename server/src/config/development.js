
const config = {
    mongodb: {
        hostaddress: 'mongodb://localhost',
        port: 27017,
        dbname: 'node_dice'
    },
    mongoStore: {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    bitcoin: {
        host: 'rpc.blockchain.info',
        port: 443,
        ssl: true,
        user: 'your identification',
        pass: 'your password'
    },
    faucet: {
        interval: 15 * 60 * 1000,
        min: 100,
        max: 500,
        proxy: null //try to use proxy to connect to google if blocked
    },
    origins: "*:*"
};

export default config;