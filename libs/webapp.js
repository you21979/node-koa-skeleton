'use strict'; 
const koa = require('koa');
const jsonBody = require('koa-json-body');
const ip = require('request-ip');
const accesslog = require('./middleware/accesslog');

const start = exports.start = dirname => {
    const app = new koa();

    app
        .use(jsonBody({ limit: '10kb' }))
        .use(accesslog('webserver'))
        .use((ctx, next) => {
            next().then(() => {
                ctx.client = {
                    remote_addr : ip.getClientIp(ctx.req),
                }
            })
        })
        ;

    const apis = require(dirname + "/apis");
    const base_path = '/api/v0';
    apis.forEach(api => {
        api(base_path).forEach(route => app.use(route))
    })
    return app;
}

