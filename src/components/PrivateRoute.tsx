import { LOCAL_STORAGE_KEYS } from "constants/index";
import { PERMISSION } from "enums/index";
import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

interface IPrivateRouter extends Omit<RouteProps, "render"> {
  children: React.ReactNode;
  permission?: PERMISSION;
}

const ProtectedRouter = ({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: PERMISSION;
}) => {
  const user = {};

  if (!user || !(LOCAL_STORAGE_KEYS.ACCESS_TOKEN in localStorage))
    return <Redirect to={"/login"} />;

  return (
    <>
      {user && LOCAL_STORAGE_KEYS.ACCESS_TOKEN in localStorage ? (
        children
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

const PrivateRouter = (props: IPrivateRouter) => {
  const { children, permission, ...rest } = props;

  return (
    <Route
      render={() => (
        <ProtectedRouter permission={permission || PERMISSION.USER}>
          {children}
        </ProtectedRouter>
      )}
      exact
      {...rest}
    />
  );
};
export default PrivateRouter;
