# Microapps React Authentication Context module

This module handles an **Authentication Context** to be used in any micro app that uses **React**

# Status:
[![Tests](https://github.com/malazaysc/microapps-react-auth-context/actions/workflows/test_build_publish.yml/badge.svg)](https://github.com/malazaysc/microapps-react-auth-context/actions/workflows/test_build_publish.yml)

# Installation
```sh
yarn add @southerncode/microapps-react-authentication-context
yarn add js-cookie
```

## How to use it

First off, the **login** function needs to know how to get the token, in this case it comes bundled in with a method that makes a **POST** request to a url, that needs to be specified via two ways:
NEXT_PUBLIC_AUTH_API_ENDPOINT_URL (if using **next.js**)
or 
AUTH_API_ENDPOINT_URL (if using plain **React**)

An example would be: *http://localhost:8000/api/auth/

This function sends a body to the Authentication endpoint, that needs to be passed as an object, this way it can handle different authentication parameters combination, such as *username, passsword* or *email, password*, or even any other less common parameters, such as *oneTimeToken* or whatever the endpoint is expecting.

It's also possible to pass a custom function to handle obtaining the token. This will be covered further down in the documentation.

-----
The second step is to add, **AuthProvider** at the top of your components tree:

### Example with next.js app
In the **_app.js** file:
```
import { AuthProvider } from  "@southerncode/microapps-react-authentication-context";

function  MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component  {...pageProps}  />
		</AuthProvider>
	);
} 

export  default  MyApp;
```
Then import the **login** function from the AuthContext using *useAuthContext*, and call it passing the neccessary paremeters.
Once the token is successfully retrieved, the AuthContext will set a cookie in the browser called **token** (TODO: Allow changing the **token** key name by some configuration method).

### Example Login Page implementation
```
import { useState } from  'react';
import { useAuthContext } from  "@southerncode/microapps-react-authentication-context";

export  default  function  LoginForm() {
	const { login } = useAuthContext();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const  handleSubmit = (e) => {
		e.preventDefault();
		login(username, password);
	}

	return (
		<form  onSubmit={handleSubmit}>
			<label  htmlFor="username">Username</label>
			<input  type="text"  id="username"  value={username}  onChange={(e) =>  setUsername(e.target.value)}  />
			<label  htmlFor="password">Password</label>
			<input  type="password"  id="password"  value={password}  onChange={(e) =>  setPassword(e.target.value)}  />
			<button  type="submit">Login</button>
		</form>
	)
}
```
## How to get authentication status:
Simply pull the token from the AuthContext...

### Example
```
import { useState } from  'react';
import { useAuthContext } from  "@southerncode/microapps-react-authentication-context";

export  default  function  MainPage() {
	const { token } = useAuthContext();
	
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			{token ? (<p>You are logged in</p>) : (You are logged out)}
		</div>
	)
}
```


## Logout

As you can imagine... call the logout function from AuthContext :D

### Example
```
import { useState } from  'react';
import { useAuthContext } from  "@southerncode/microapps-react-authentication-context";

export  default  function  LogoutPage() {
	const { logout} = useAuthContext();
	
	return (
		<div>
			<h1>Why you no like us?? :(</h1>
			<button onClick={() => logout()}>Logout</button>
		</div>
	)
}
```

