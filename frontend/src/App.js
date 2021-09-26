import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Authentication from "./screens/Authentication";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Switch>
      <Route path="/tweet">
        <Home auth={auth} setAuth={setAuth} />
      </Route>
      <Route path="/login">
        <Authentication auth={auth} setAuth={setAuth} />
      </Route>
    </Switch>
  );
}

export default App;
