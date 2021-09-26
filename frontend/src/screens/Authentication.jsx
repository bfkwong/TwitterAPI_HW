import { Button, Grid, TextField, Container, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { authenticate } from "../Requests";

export default function Authentication(props) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (props.auth) {
    return <Redirect to="/tweet" />;
  }

  return (
    <Container maxWidth="xs">
      <Grid container spacing={3} style={{ marginTop: 30 }} justifyContent="center">
        <Grid item>
          <Typography variant="h4">FakeTwitter</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!!error}
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => {
              setError(null);
              setUsername(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={!!error}
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => {
              setError(null);
              setPassword(e.target.value);
            }}
          />
        </Grid>
        {error?.message && (
          <Grid item>
            <Typography style={{ color: "red" }} variant="subtitle2">
              {error.message}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={async () => {
              if (props.auth === false) {
                const authResp = await authenticate(username, password);
                if (authResp.status === 200) {
                  console.log(authResp);
                  props.setAuth(true);
                  history.push("/tweet");
                } else {
                  setError(authResp);
                }
              }
            }}>
            Sign in
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
