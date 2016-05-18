const _ = require('koa-route');
const api = module.exports = base_path => {
    const makePath = path => base_path + '/test' + path
    return [
        _.get(makePath('/test'), function *(){
            this.body = JSON.stringify({msg:'Hello world'});
        }),
        _.get(makePath('/ctx'), function *(){
            this.body = JSON.stringify(this.client, null, 2);
        }),
        _.get(makePath('/users/:name'), function *(name){
            this.body = 'Hello, ' + name + '!';
        })
    ]
} 
