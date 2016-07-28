const verify = require("@you21979/simple-verify");
const mysql = require("mysql");
const Query = require("query");

const getApiData = (conn, apikey) => Query.create(conn, "select * from accesskey where apikey=?", [apikey]).first()

const verifyCheck = module.exports = (sv) => (ctx, next) => {
    if(ctx.request.method == 'POST'){ 
        const argo = "sha512";
        const apikey = ctx.request.header['key'];
        const sign = ctx.request.header['sign'];
        const data = ctx.rawbody;

        return getApiData(sv.mysqlConn, apikey).then(res => verify.check(argo, sign, res.secret, data) ).then(res => {
            if(res){
                next()
            }else{
                ctx.body = JSON.stringify({status : 2, message : "apikey verify error"})
            }
        }).catch(err => {
            ctx.body = JSON.stringify({status : 1, message : "apikey error"})
        })
    }   
}   

