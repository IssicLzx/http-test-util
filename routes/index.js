var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post', function(request, response, next){

  var body = request.body;
  console.log('body : %j', request.body);

  if(body.type == 'post') {

    var options = {
      host : body.host,
      port : body.port,
      method: 'POST',
      path: body.path,
      handers:{
        "Content-Type": 'application/json',
        "Content-Length": body.params.length
      }
    }

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
        response.send(200, {code: res.statusCode});
      }

    })

    req.write(body.params);


  } else {

    http.get(body.url, function(res){
      console.log("response : ", res.statusCode);
    }).on('error', function(err){
      console.log("err : ", e.message);
    })

  }


});



module.exports = router;
