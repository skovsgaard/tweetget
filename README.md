# Tweetget

A simple module to import a full Twitter stream.

**To use:** Simply require the module with
    require('./tweetget');
.

**Example:**

Return an object containing posts with appropriate timestamps:

    tweetget('status402', function(err, posts) {
      if (!err) {
        console.log(posts);
      }
    });

Write the object to a file:

    tweetget.write('status402', 'file.txt', function(err, posts) {
      if (!err) {
        console.log('Yay! You wrote stuff to file.txt');
      }
    });
