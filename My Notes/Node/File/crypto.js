const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('FYG');

console.log(hash.digest('hex'))
