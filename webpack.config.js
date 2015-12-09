require('babel-core/register');

//process.env.NODE_ENV = process.env.NODE_ENV || 'production';


const config   = require('./build/config');
console.log('ENV [', config.get('env'), ']');
module.exports = require('./build/webpack/' + config.get('env'));
