'use strict'; 
const koa = require('koa');
const jsonBody = require('koa-json-body');
const ip = require('request-ip');
const accesslog = require('./middleware/accesslog');
const verifyCheck = require('./middleware/verify_check');
const postCapture = require('./middleware/post_capture');
const mysql = require("mysql");

const start = exports.start = dirname => {
    const app = new koa();
    const sv = {
        pool : mysql.createPool({
            connectionLimit : 10,
            host : "localhost",
            user : "root",
            password : "",
            database : "cryptobank",
        }),
    }
    app
        .use(postCapture())
        .use(verifyCheck(sv))
        .use(accesslog('webserver'))
        .use((ctx, next) => {
            ctx.client = {
                remote_addr : ip.getClientIp(ctx.req),
            }
            next()
        })
        ;
    const apis = require(dirname + "/apis");
    const base_path = '/api/v0';
    apis.forEach(api => {
        api(base_path, sv).forEach(route => app.use(route))
    })
    return app;
}

