var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

function tweetget(handle, cb) {
  var tweets = {};
  var target = "http://twitter.com/" + handle;
  request(target, function(err, res, body) {
    if (err && cb) return cb(err);

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

      if(cb) return cb(null, tweets);
    }
  });
}

module.exports = tweetget;

tweetget.write = function(handle, filename, cb) {
  var filer = fs.createWriteStream(filename);
  
  filer.on('error', function(err) {
    if (cb) return cb(err);
  });

  tweetget(handle, function(err, res) {
    filer.write('Tweets for ' + handle + ':\n\n');
    for (var i in res) {
      filer.write(i + '\n --- \n');
      if (cb) return cb(null, filename);
    }
  });
}
