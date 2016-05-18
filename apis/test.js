const _ = require('koa-route');
const api = module.exports = (base_path) => {
    const current_path = base_path + '/test'
    return [
        _.get(current_path + '/test', function *(){
            this.body = JSON.stringify({msg:'Hello world'});
        }),
        _.get(current_path + '/users/:name', function *(name){
            this.body = 'Hello, ' + name + '!';
        })
    ]
} 
