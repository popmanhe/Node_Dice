import all from './all';
import development from './development';
import production from './production';

// default is development environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = process.env.NODE_ENV == "development" ? Object.assign(all, development) : Object.assign(all, production);
// Load app configuration
export default config;
