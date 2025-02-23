# ShieldX


### Authentication Process:

- User logs in with his email and password.
- Email and password is sent to the server.
- Server verifies email and password and generates two JWT token, one for authentication and one for refreshing the authentication if it expired.
- Server sends the token to the clients
- Client requests the user account data with the token it received. If the token is expired, then it calls the refresh api with the refresh token given. Then the server verifies and generates the auth token again and sends to the client & using the auth token, client gets the user account / all other data as required.



### APIS

Test the server:
```bash
/
```

Register an user:

```bash
/api/auth/register

# required body:
# {name, email, password}
```

Login an user (generate auth token):

```bash
/api/auth/login

# required body:
# {email, password}
```

Refresh auth token (only if token expired):
```bash
/api/auth/refresh

# required body:
# {refreshToken} => Received from login api call
```

User account data fetch
```bash
/api/profile/me

# required body:
# {email}

# required Authorization:
# Bearer ...authToken
```

### .env structure
```bash
PORT = ???
JWT_SECRET= ???
JWT_REFRESH_SECRET = ???
```


## NOTE

To run the project make sure to have a mentioned .env file and a firebase service account as `service_account.json` in the root directory of the project.