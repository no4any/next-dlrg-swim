import { generateKeyPair } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

// Generates a 4096-bit RSA key pair (4096-bit is strongly recommended for security)
generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
}, (err, publicKey, privateKey) => {
    if (err) throw err;
    writeFile('./packages/next/src/lib/jwt/keys.json', JSON.stringify({
        publicKey,
        privateKey
    }), 'utf8')
});