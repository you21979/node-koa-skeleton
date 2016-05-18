'use strict'; 
const koa = require('koa');
const koaBody = require('koa-body');
const ip = require('request-ip');
const moment = require('moment');
const util = require('util');
const Log4js = require('log4js')

const start = exports.start = dirname => {
    const logger = Log4js.getLogger('webserver');
    const app = koa();

    app
        .use(koaBody({}))
        .use(function *(next){
            this.client = {
                remote_addr : ip.getClientIp(this.req),
            }
            yield next;
        })
        .use(function* (next){
            const DEFAULT = "%s %s -- %s %s HTTP/%s, %s %s";
            const req = this.request, header = req.header, nodeReq = this.req;
            const str = util.format(DEFAULT,
                moment().format("YYYY/MM/DD HH:mm:ss"),
                req.ip,
                req.method,
                req.url,
                nodeReq.httpVersion,
                req.length || null,
                header['user-agent']);
            logger.debug(str);
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

