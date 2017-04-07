import all from './all';
import development from './development';
import production from './production';

// default is development environment
//console.log('process.env.socket: ' + process.env.SOCKET);
// process.env.NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
const config = process.env.NODE_ENV === 'production' ? Object.assign(all, production) : Object.assign(all, development);

// Load app configuration
export default config;
