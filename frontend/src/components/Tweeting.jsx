import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Grid } from "@material-ui/core";
import { postTweet } from "../Requests";

export default function Tweeting(props) {
  const [tweet, setTweet] = React.useState("");

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="What's on your mind?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          helperText={`${280 - tweet?.length} characters left`}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  await postTweet(tweet);
                  setTweet("");
                  props.onTweet();
                } catch (err) {
                  console.log("failed to post tweet");
                }
              }}>
              Tweet
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
