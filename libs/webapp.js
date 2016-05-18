'use strict'; 
const koa = require('koa');
const koaBody = require('koa-body');
const ip = require('request-ip');
const start = exports.start = dirname => {
    const app = koa();

    app
        .use(koaBody({}))
        .use(function *(next){
            this.client = {
                remote_addr : ip.getClientIp(this.req),
            }
            yield next;
        })
        ;

    const apis = require(dirname + "/apis");
    const base_path = '/api/v0';
    apis.forEach(api => {
        api(base_path).forEach(route => app.use(route))
    })
    return app;
}

