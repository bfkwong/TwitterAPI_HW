import sha256 from "crypto-js/sha256";

export async function getAllTweets() {
  const response = await fetch("http://localhost:3000/all_tweets", {
    method: "get"
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function postTweet(tweet) {
  const response = await fetch("http://localhost:3000/tweet", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tweet })
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function deleteTweet(id) {
  const response = await fetch(`http://localhost:3000/tweet/${id}`, {
    method: "delete"
  });
  const responseJSON = await response.json();
  return responseJSON;
}

export async function authenticate(username, password) {
  const response = await fetch("http://localhost:3000/authenticate", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password: `${sha256(password)}` })
  });
  const responseJSON = await response.json();
  return { ...responseJSON, status: response.status };
}
