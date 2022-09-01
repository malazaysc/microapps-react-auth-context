import React from 'react';
import {
    createContext,
    useContext,
    useState,
  } from "react";
import { loginApi } from './api/login.api';
  
  const Cookies = require("js-cookie");
  
  const AuthContext = createContext({});
  AuthContext.displayName = "AuthContext";
  
  export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("token"));
  
    /**
     * This function is used to login the user.
     * If the login is successful, the token is stored in the cookies.
     * @param {*} body is an object containing the body that the api endpoint expects.
     * @example login({email: "username", password: "password"})
     */
    const login = async (body) => {
      const response = await loginApi(body);
      const { status, data, error } = response;
      if (error) {
        console.log("Error logging in", error);
        return {
          error,
          status,
          data
        }
      }
      if (status === 200) {
        setToken(data.access);
        Cookies.set("token", data.access);
      }

      return {
        error,
        status,
        data
      }
    };
  
    /**
     * This function is used to logout the user.
     * The token is removed from the cookies.
     */
    const logout = () => {
      Cookies.remove("token");
      setToken(undefined);
    };
  
    return (
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context)
      throw new Error(`useAuthContext must be used within AuthProvider`);
  
    return context;
  };
  