var request = require('request'),
    cheerio = require('cheerio'),
    target = 'http://www.twitter.com/' + process.argv[2];

request(target, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    var $ = cheerio.load(body, {
      ignoreWhitespace: true,
      lowerCaseTags: true
    });
    var tweets = [];
    $('.tweet-text').each(function(i, element) {
      tweets[i] = $(this).text();
    });
    tweets.forEach(function(i) {
      console.log(i + "\n");
    })
  }
});