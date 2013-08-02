var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

function tweetget(handle, cb) {
  var tweets = {};
  var target = "http://twitter.com/" + handle;
  request(target, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var $ = cheerio.load(body, {
        ignoreWhitespace: true,
        lowerCaseTags: true
      });

      var tweetTexts = $('.tweet-text');
      var times = $('.tweet-timestamp');
      $(times).each(function(time) {
        tweets[$(this).attr('title')] = $(tweetTexts[time]).text();
      });

      cb(tweets);
      return tweets;
    }
  });
}

module.exports = tweetget;

tweetget.write = function(handle, filename) {
  var filer = fs.createWriteStream(filename);
  tweetget(handle, function(res) {
    filer.write('Tweets for ' + handle + ':\n\n');
    res.forEach(function(i) {
      filer.write(i + '\n --- \n');
    });
  });
}