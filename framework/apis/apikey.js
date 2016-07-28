const _ = require('koa-route');

const verify = require("@you21979/simple-verify");

const api = module.exports = base_path => {
    const makePath = path => base_path + '/apikey' + path
    return [
        _.post(makePath('/check'), (ctx, next) => {
console.log("1")
                ctx.body = JSON.stringify({
                    status : 0,
                    message : "success",
                });
        })
    ]
} 
