'use strict'
const http = require('http');
const webapp = require('./webapp');
const main = module.exports = dirname => {
    const app = webapp.start(dirname);
    return http.createServer(app.callback()).listen(3000, '0.0.0.0')
}
