var express = require('express');
var request = require('request');
var parseString = require('xml2js').parseString;

var app = express();
module.exports.app = app;
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {

  var url = req.query.url;
  if (!url) {
    res.status(422);
    return res.json({message: 'url parameter not found'});
  }

  request(url, function(err, response, body) {
      if (err) {
        res.status(err.code || 400);
        return res.json({message: 'error fetching url', error: err.message});
      }

      console.log(body);

      if (response.statusCode !== 200) {
        res.status(response.statusCode);
        return res.json({message: 'unable to fetch url', code: response.statusCode});
      }

      parseString(body, function (err, result) {
        if (err) {
          res.status(err.code || 400);
          return res.json({message: 'unable to parse XML'});
        }

        return res.json({url: url, feed: result});
      });


  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
