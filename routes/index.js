var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('../querystring');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var JsonToCookieString = function(obj){
  var str = ''
      , i = 0;
  for(var key in obj) {
    if (i != 0) {
      str += ', ';
    }
    i++;
    str += key + '=' + obj[key];
  }
  return str;
};

var JsonToQueryString = function(obj){
  var str = ''
      , i = 0;
  for(var key in obj) {
    if (i != 0) {
      str += '&';
    }
    i++;
    str += key + '=' + JSON.stringify(obj[key]);
  }
  return str;
};


router.post('/post', function(request, response, next){

  var body = request.body;
  console.log('body : %j', request.body);

  var params = querystring.stringify(JSON.parse(body.params));
  var cookie = JsonToCookieString(JSON.parse(body.cookie));


  if(body.type == 'post') {

    console.log('params length: ' ,params.length );
    var options = {
      host : body.host,
      port : parseInt(body.port),
      method: 'POST',
      path: body.path,
      headers:{
        cookie:cookie,
        "Content-Type": 'application/x-www-form-urlencoded',
        'Content-Length': params.length
      }
    };

    var req = http.request(options, function(res){
      if(res.statusCode == 200) {
        var body = "";
        res.on('data', function(data) {
          body += data;
        }).on('end', function(error){
          response.send(200, body);
        })
      }

      else {
        console.log('res : ', res);
        response.send(200, {code: res.statusCode  });
      }

    });
    console.log('params :' ,params);
    req.write(params);
    req.end();

  } else {

    http.get(body.url, function(res){
      console.log("response : ", res.statusCode);
    }).on('error', function(err){
      console.log("err : ", e.message);
    })

  }


});



module.exports = router;
