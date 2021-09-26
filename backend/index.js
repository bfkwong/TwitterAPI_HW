const express = require("express");
var cors = require("cors");

const {
  authenticateHandler,
  getAllTweetsHandler,
  getTweetHandler,
  postTweetHandler,
  deleteTweetHandler
} = require("./routeHandler");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/authenticate", authenticateHandler);
app.get("/all_tweets", getAllTweetsHandler);
app.get("/tweet/:id", getTweetHandler);
app.post("/tweet", postTweetHandler);
app.delete("/tweet/:id", deleteTweetHandler);

app.listen(port, () => {
  console.log(`Twitter API backend listening at http://localhost:${port}`);
});
