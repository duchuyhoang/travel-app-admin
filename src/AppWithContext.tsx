import AuthContext from "components/AuthContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const AppWithContext = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  );
};

export default AppWithContext;
