const _ = require('koa-route');

const api = module.exports = (base_path, sv) => {
    const makePath = path => base_path + '/apikey' + path
    return [
        _.post(makePath('/check'), (ctx, next) => {
            console.log(ctx.auth.account_id)
            ctx.body = JSON.stringify({
                status : 0,
                message : "success",
            });
        })
    ]
} 
