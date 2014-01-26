var tweetget = require('./tweetget');

tweetget('status402', function(err, res) {
  if (!err) console.log(res);
})

tweetget.write('status402', 'file.txt', function(err, res) {
  if (!err) console.log('YAY! File written!');
});
