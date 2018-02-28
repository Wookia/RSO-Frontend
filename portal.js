var express = require("express");
var app = express();
var http = require('http').Server(app);

app.set('port', (process.env.PORT || 7373));

app.use(express.static(__dirname + '/src'));

http.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});