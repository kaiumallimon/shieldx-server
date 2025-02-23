# ShieldX


### Authentication Process:

- User logs in → Client sends credentials to Node.js

- Node.js verifies credentials → Generates access & refresh tokens

- Client stores tokens securely

- Client uses access token to authenticate API requests

- If access token expires, refresh token is used to get a new one

- User logs out → Clears stored token