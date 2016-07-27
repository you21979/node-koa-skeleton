const rawBody = require('raw-body');

const postCapture = module.exports = () => (ctx, next) => {
    return rawBody(ctx.req, {
        length: ctx.req.headers['content-length'],
        limit: '1mb',}
    ).then((buffer)=>{
        ctx.rawbody = buffer.toString()
        return next()
    })
}

