tweetget
========

Print a twitter stream to stdout or stream to a log file called tweets.txt.

**To use:** Simply run the script like any other node application and follow that with the name of the Twitter profile to dump tweets from.

**Examples:**

To simply print:

    node tweetget status402

To write to the file, tweets.txt:

    node tweetget status402 -w