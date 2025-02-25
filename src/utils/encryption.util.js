const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = process.env.AES_SECRET;
const iv = crypto.randomBytes(16); 

// Encrypt Function
const encryptPassword = (password) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};


// exporting the encrypt function
module.exports = {
    encryptPassword
};

