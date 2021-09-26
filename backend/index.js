const express = require("express");
var Twitter = require("twitter");

const { createErr, reqWrapper } = require("./utility");

const app = express();
const port = 3000;

app.use(express.json());

var client = new Twitter({
    consumer_key: "Xf4EMZstGzYRXvEylcEZpwxvx",
    consumer_secret: "xZnB2Rhh28tRQVXIfl75gpRXaiqOLth2L7xgGquHpnMSuebjld",
    access_token_key: "1437171746121994242-nls6eTKZuFQYENjcMMf3sibFN9NXq1",
    access_token_secret: "3oeE6UpVQTGh9NaUPa3SsBjEswRUJmA1dDM5uX4RlXTav",
});

const userDB = {
    admin1: {
        passwordSHA256:
            "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    },
};

// super insecure authentication system, but i guess its better than nothing lol
app.get("/authenticate", (req, res) => {
    if (
        req?.body?.username &&
        req?.body?.password === userDB[req.body.username]
    ) {
        res.status(200).json({ authToken: useToken });
    } else {
        res.status(401).json(createErr("Unable to authenticate"));
    }
});

app.get("/all_tweets", (req, res) => {
    reqWrapper(res, () => {
        client.get("statuses/user_timeline", {}, (err, tweet, _) => {
            if (!err) {
                res.status(200).json(tweet);
            } else {
                res.status(405).json(createErr("Error from Twitter API", err));
            }
        });
    });
});

app.get("/tweet/:id", (req, res) => {
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
});

app.post("/tweet", (req, res) => {
    if (typeof req.body.tweet !== "string") {
        res.status(400).json(
            createErr("Must provide a tweet in request body of type string")
        );
        return;
    }
    reqWrapper(() => {
        client.post(
            "statuses/update",
            { status: req.body.tweet },
            function (error, tweet, _) {
                if (!error) {
                    res.status(200).json(tweet);
                } else {
                    res.status(405).json(
                        createErr("Error from Twitter API", error)
                    );
                }
            }
        );
    });
});

app.delete("/tweet/:id", (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Twitter API backend listening at http://localhost:${port}`);
});
