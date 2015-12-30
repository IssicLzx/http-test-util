var querystring = require('./node_modules/querystring');
var params = querystring.stringify(
    {"name":"小学生","roles":{"role":1}});
console.log(params);
console.log(querystring)