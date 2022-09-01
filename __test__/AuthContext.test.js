import React, { useEffect } from "react";
import { screen, fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";
import { AuthProvider, useAuthContext } from "../src/AuthContext";
import userEvent from '@testing-library/user-event';

global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    status: 200,
    success: true, error: null,
    json: () => Promise.resolve({  access: "token" }),
  })
)

const Component = () => {
  const { token, login, logout } = useAuthContext();

  useEffect(() => {
    if (token) {
      console.log('Token has been setup', token);
      console.log('Should display the logout button');
    }
    
  }, [token])

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
  render(
    <AuthProvider>
      <Component />
    </AuthProvider>
  );

  
  // fireEvent.click(getByText("Login"));
  const loginBtn = screen.getByRole('button', {
    name: /login/i
  })

  userEvent.click(loginBtn);

  const logoutBtn = screen.findByText("Logout")
  expect(logoutBtn).toBeTruthy()
  screen.logTestingPlaygroundURL();
});
