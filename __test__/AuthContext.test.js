import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { AuthProvider, useAuthContext } from "../src/AuthContext";

const Component = () => {
  const { token, login, logout } = useAuthContext();
  return (
    <div>
      {token ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <button onClick={() => login("username", "password")}>Login</button>
      )}
    </div>
  );
};

it("Token does not exist by default", () => {
  const { getByText } = render(
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
  expect(getByText("Login")).toBeTruthy();
});

it("Token is present after login", () => {
  const { getByText, getByTestId } = render(
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
  fireEvent.click(getByText("Login"));
  expect(getByText("Logout")).toBeTruthy();
});
