const _ = require('koa-route');
const rp = require('request-promise');
const api = module.exports = base_path => {
    const makePath = path => base_path + '/apikey' + path
    return [
        _.post(makePath('/test'), (ctx) => {

            ctx.body = ctx.request.header['apikey']

        })
    ]
} 
