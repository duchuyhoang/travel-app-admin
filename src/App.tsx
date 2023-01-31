import React from "react";
import Container from "components/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "constants/routes";
import Login from "pages/Login/index";
import PrivateRouter from "components/PrivateRoute";
import { PERMISSION } from "enums";
import UserManagement from "pages/UserManagement";

function App() {
  return (
    <Switch>
      <Route exact path={"/login"}>
        <Login />
      </Route>

      <Container>
        <PrivateRouter exact permission={PERMISSION.ADMIN} path="/">
          <UserManagement />
        </PrivateRouter>
        {routes.map((route) =>
          route.private ? (
            <PrivateRouter
              exact
              permission={PERMISSION.ADMIN}
              path={route.path}
            >
              <route.page />
            </PrivateRouter>
          ) : (
            <Route exact path={route.path}>
              <route.page />
            </Route>
          )
        )}
      </Container>
    </Switch>
  );
}

export default App;
