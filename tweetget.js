var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var target  = 'http://www.twitter.com/' + process.argv[2];

request(target, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    var tweets = [];
    var filer = fs.createWriteStream('tweets.txt');
    var $ = cheerio.load(body, {
      ignoreWhitespace: true,
      lowerCaseTags: true
    });
    $('.tweet-text').each(function(i, element) {
      tweets[i] = $(this).text();
    });
    tweets.forEach(function(i) {
      console.log(i + '\n');
      filer.write(i + '\n --- \n');
    });
  }
});