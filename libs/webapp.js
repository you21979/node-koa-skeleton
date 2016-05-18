'use strict'; 
const koa = require('koa');
const start = exports.start = dirname => {
    const apis = require(dirname + "/apis");
    const app = koa();
    const base_path = '/api/v0';
    apis.forEach(api => {
        api(base_path).forEach(route => app.use(route))
    })
    return app;
}

