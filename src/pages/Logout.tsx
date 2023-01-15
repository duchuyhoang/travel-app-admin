import { useAuthContext } from "components/AuthContext";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    auth.logout();
    history.push("/login");
  }, []);
  return null;
};

export default Logout;
