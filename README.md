# ShieldX

ShieldX is a secure and efficient password manager built using Firebase and Node.js. It allows users to store, manage, and retrieve their passwords securely. The application ensures that user data is protected with robust authentication and authorization mechanisms.

## Features

- **User Authentication**: Secure user registration and login using JWT tokens.
- **Password Management**: Store, update, retrieve, and delete passwords.
- **User Profile**: Access and manage user profile information.
- **Token Refresh**: Refresh authentication tokens to maintain secure sessions.
- **Middleware**: Authentication middleware to protect routes and ensure secure access.


- **Password generator**: Generate strong and efficient password using the password generator tool and store automatically. <i>[Coming soon..]</i>

## Project Structure

```bash
shieldx
├──src
│   ├──config
│   │   └──firebase.config.js
│   ├──middlewares
│   │   └──auth.middleware.js
│   ├──modules
│   │   ├──auth
│   │   │   ├──controllers
│   │   │   │   └──auth.controller.js
│   │   │   ├──models
│   │   │   │   └──auth.model.js
│   │   │   ├──routes
│   │   │   │   └──auth.route.js
│   │   │   └──services
│   │   │   │   └──auth.service.js
│   │   ├──passwords
│   │   │   ├──controllers
│   │   │   │   └──passwords.controller.js
│   │   │   ├──models
│   │   │   │   └──passwords.model.js
│   │   │   └──routes
│   │   │   │   └──passwords.route.js
│   │   ├──test
│   │   │   ├──controllers
│   │   │   │   └──test.controller.js
│   │   │   └──routes
│   │   │   │   └──test.route.js
│   │   └──user
│   │   │   ├──controller
│   │   │   │   └──user.controller.js
│   │   │   ├──model
│   │   │   │   └──user.model.js
│   │   │   └──routes
│   │   │   │   └──user.routes.js
│   ├──utils
│   │   ├──aes.generator.util.js
│   │   └──encryption.util.js
│   └──index.js
├──package-lock.json
├──package.json
├──README.md
└──.gitignore
```

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/kaiumallimon/shieldx-server.git
    cd shieldx
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    PORT = 3000
    JWT_SECRET=???
    JWT_REFRESH_SECRET=???
    AES_SECRET=???<32 character>
    FIREBASE_SERVICE_ACCOUNT=???
    ```

4. Start the application:
    ```bash
    node src/index.js
    ```

5. Access the application at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

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

# request type: POST
# required body:
# {name, email, password}
```

Login an user (generate auth token):

```bash
/api/auth/login

# request type: POST
# required body:
# {email, password}
```

Refresh auth token (only if token expired):
```bash
/api/auth/refresh

# request type: POST
# required body:
# {refreshToken} => Received from login api call
```

User account data fetch
```bash
/api/profile/me

# request type: POST
# required body:
# {email}

# required Authorization:
# Bearer ...authToken
```

Store Password
```bash
/api/password/store

# request type: POST
# required Authorization:
# Bearer ...authToken

# required body:
# { userId, clientTitle, clientUsername, clientPassword, clientUrl, notes }

# notes & clientUrl is optional
```

Retreive all passwords of an user
```bash
/api/password/all/:userId

# request type: GET
# required Authorization:
# Bearer ...authToken
```

Retreive saved data of a password by passwordId
```bash
/api/password/single/:passwordId

# request type: GET
# required Authorization:
# Bearer ...authToken
```

Delete a password
```bash
/api/password/delete/:passwordId

# request type: GET
# required Authorization:
# Bearer ...authToken
```

Update a password
```bash
/api/password/update/:passwordId

# request type: POST
# required Authorization:
# Bearer ...authToken

# required body:
# { passwordId, clientTitle, clientUsername, clientPassword, clientUrl, notes }
```

## Author
[Kaium Al Limon](www.facebook.com/lemon.exee)