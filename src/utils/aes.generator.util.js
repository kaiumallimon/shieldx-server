const crypto = require('crypto');
console.log(crypto.randomBytes(24).toString('base64').substring(0, 32));
