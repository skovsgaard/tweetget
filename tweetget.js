var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');
var target  = 'http://www.twitter.com/' + process.argv[2];
var flag    = process.argv[3];

request(target, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    var tweets = [];
    if (flag == '-w') {
      var filer = fs.createWriteStream('tweets.txt');
    }
    var $ = cheerio.load(body, {
      ignoreWhitespace: true,
      lowerCaseTags: true
    });
    $('.tweet-text').each(function(i, element) {
      tweets[i] = $(this).text();
    });
    tweets.forEach(function(i) {
      if (!flag) {
        console.log(i + '\n ---');
      } else if (flag == '-w') {
        filer.write(i + '\n --- \n');
      }
    });
  }
});