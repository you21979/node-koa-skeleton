const verify = require("@you21979/simple-verify");
const mysql = require("mysql");

const query = (conn, sql, params) => new Promise((resolve, reject) => {
    conn.query(sql, params, (err, rows) => {
        if(err) reject(err)
        else resolve(rows)
    })
})

const getApiData = (conn, apikey) => query(conn, "select * from accesskey where apikey=?", [apikey]).then(res => res[0])

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

