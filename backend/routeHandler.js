var Twitter = require("twitter");

var KeysAndTokens = require("./keys.json");
var client = new Twitter(KeysAndTokens);
const { createErr, reqWrapper } = require("./utility");

const userDB = {
  admin1: {
    passwordSHA256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
  }
};

const authenticateHandler = (req, res) => {
  if (!req?.body?.username) {
    res.status(401).json({ message: "No username provided" });
    return;
  }
  if (!req?.body?.password) {
    res.status(401).json({ message: "No password provided" });
    return;
  }
  if (!userDB[req.body.username]) {
    res.status(401).json({ message: "Username does not exist" });
    return;
  }
  if (req.body.password !== userDB[req.body.username].passwordSHA256) {
    res.status(401).json({ message: "Incorrect password" });
    return;
  }
  res.status(200).json({ message: "Success" });
};

const getAllTweetsHandler = (req, res) => {
  reqWrapper(res, () => {
    client.get("statuses/user_timeline", {}, (err, tweets, _) => {
      if (!err) {
        res.status(200).json(tweets);
      } else {
        res.status(405).json(createErr("Error from Twitter API", err));
      }
    });
  });
};

const getTweetHandler = (req, res) => {
  const tweetId = req.params.id;
  if (tweetId.match && !tweetId.match(/^-?\d+$/)) {
    res.status(400).json(createErr("TweetID must be numerical"));
    return;
  }
  reqWrapper(res, () => {
    client.get("statuses/show", { id: tweetId }, (err, tweet, _) => {
      if (!err) {
        res.status(200).json(tweet);
      } else {
        res.status(405).json(createErr("Error from Twitter API", err));
      }
    });
  });
};

const postTweetHandler = (req, res) => {
  console.log(req.body);
  if (typeof req.body.tweet !== "string") {
    res.status(400).json(createErr("Must provide a tweet in request body of type string"));
    return;
  }
  reqWrapper(res, () => {
    client.post("statuses/update", { status: req.body.tweet }, function (error, tweet, _) {
      if (!error) {
        res.status(200).json(tweet);
      } else {
        res.status(405).json(createErr("Error from Twitter API", error));
      }
    });
  });
};

const deleteTweetHandler = (req, res) => {
  const tweetId = req.params.id;
  if (tweetId.match && !tweetId.match(/^-?\d+$/)) {
    res.status(400).json(createErr("TweetID must be numerical"));
    return;
  }
  reqWrapper(res, () => {
    client.post("statuses/destroy", { id: tweetId }, (err, tweet, _) => {
      if (!err) {
        res.status(200).json(tweet);
      } else {
        res.status(405).json(createErr("Error from Twitter API", err));
      }
    });
  });
};

module.exports = {
  authenticateHandler,
  getAllTweetsHandler,
  getTweetHandler,
  postTweetHandler,
  deleteTweetHandler
};
