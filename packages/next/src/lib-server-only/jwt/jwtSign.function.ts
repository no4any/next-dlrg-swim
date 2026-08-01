import "server-only"

import { User } from '@/src/model';
import KEYS from './keys.json';
import { importPKCS8, SignJWT } from 'jose';

const privateKey = KEYS.privateKey;
const alg = 'RS256';

export async function jwtSign(user: User) {
    const { email } = user;
    const payload = { email };
    return await new SignJWT(payload)
        .setSubject(user.email)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(await importPKCS8(privateKey, alg))
}