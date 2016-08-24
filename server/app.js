'use strict';

var express = require('express');
var app = express();
var port = 8001;

app.use(express.static('./client/'));
app.use(express('./'));
// any deep link calls should return index.html
app.use('/*', express.static('./client/index.html'));

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
