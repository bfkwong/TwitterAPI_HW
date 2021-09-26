import { Grid, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { deleteTweet } from "../Requests";

export default function Tweet(props) {
  return (
    <Grid container style={{ borderStyle: "solid", borderWidth: 0, borderBottomWidth: 1, paddingBottom: 15 }}>
      <Grid item xs>
        <Typography variant="body1">{props?.tweet?.text}</Typography>
        <Typography variant="subtitle2">
          {new Date(props?.tweet?.created_at).toLocaleString()} by @{props?.tweet?.user?.screen_name}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          id={`dlt_tweet_${props?.tweet?.id_str}`}
          onClick={async () => {
            await deleteTweet(props?.tweet?.id_str);
            props.onDelete();
          }}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
