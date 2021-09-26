import { Grid, Container, Typography, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import Tweeting from "../components/Tweeting";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect, useHistory } from "react-router";
import { getAllTweets } from "../Requests";

export default function Home(props) {
  const [allTweets, setAllTweets] = useState([]);
  const history = useHistory();

  const requestTweets = async () => {
    const allTweetsResp = await getAllTweets();
    setAllTweets(allTweetsResp);
  };

  useEffect(() => {
    requestTweets();
  }, []);

  if (!props.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm" style={{ marginTop: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container alignItem="center">
              <Grid item xs>
                <Typography variant="h5">Fake Twitter</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={async () => {
                    await props.setAuth(false);
                    history.push("/login");
                  }}>
                  <ExitToAppIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tweeting onTweet={requestTweets} />
          </Grid>
          {allTweets?.length > 0 &&
            allTweets.map((tweetData) => (
              <Grid item xs={12}>
                <Tweet tweet={tweetData} onDelete={requestTweets} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
