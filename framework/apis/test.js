const _ = require('koa-route');
const rp = require('request-promise');
const api = module.exports = base_path => {
    const makePath = path => base_path + '/test' + path
    return [
        _.get(makePath('/test'), (ctx) => {
            ctx.body = JSON.stringify({msg:'Hello world'});
        }),
        _.post(makePath('/test'), (ctx) => {
            ctx.body = JSON.stringify(ctx.request.body, null, 2);
        }),
        _.get(makePath('/ctx'), (ctx) => {
            ctx.body = JSON.stringify(ctx.client, null, 2);
        }),
        _.get(makePath('/yahoo'), (ctx, name) => { // async
            ctx.body = rp("http://www.yahoo.co.jp");
        }),
        _.get(makePath('/users/:name'), (ctx, name) => {
            ctx.body = 'Hello, ' + name + '!';
        })
    ]
} 
