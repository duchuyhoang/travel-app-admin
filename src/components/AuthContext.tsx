import { LOCAL_STORAGE_KEYS } from "constants/index";
import { PERMISSION } from "enums/index";
import React, { useMemo, useState } from "react";
import { useContext } from "react";
import { parseJwt } from "utils/index";
const defaultValue = {
  user: null,
  permission: null,
  logout: () => {
    console.log("hello");
  },
  login: (token: string) => {
    return [] as any;
  },
};

const Context = React.createContext(defaultValue);

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [contextValue, setContextValue] = useState({ ...defaultValue });

  const listActions = useMemo(
    () => ({
      logout: () => {
        console.log("hdad");

        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        setContextValue({ ...defaultValue });
      },
      login: (token: string) => {
        try {
          const data = parseJwt(token);
          if (data.permission !== PERMISSION.ADMIN) {
            return [null, { message: "Not an admin!" }];
          } else {
            const { permission, tokenExpireTime, exp, iat, ...user } = data;
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
            setContextValue({
              user,
              permission,
            } as any);
            return [true];
          }
        } catch (e) {
          return [null, e];
        }
      },
    }),
    []
  );

  return (
    <Context.Provider value={{ ...contextValue, ...listActions }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(Context);
};

export default AuthContext;
