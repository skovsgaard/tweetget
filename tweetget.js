var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

function tweetget(handle, cb) {
  var target = "http://twitter.com/" + handle;
  request(target, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var tweets = [];     
      var $ = cheerio.load(body, {
        ignoreWhitespace: true,
        lowerCaseTags: true
      });      
      $('.tweet-text').each(function(i, element) {
        tweets[i] = $(this).text();
      });      
      tweets.forEach(function(i) {
        console.log(i + '\n ---');
      });
    }
  });
}

module.exports = tweetget;