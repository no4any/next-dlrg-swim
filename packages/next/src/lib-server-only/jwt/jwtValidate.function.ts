import "server-only"

import { importSPKI, jwtVerify } from 'jose';
import KEYS from './keys.json';
import { User } from '@/src/model';

const publicKey = KEYS.publicKey;
const alg = 'RS256';

export async function jwtValidate(jwt: string) {
    const key = await importSPKI(publicKey, alg);
    try {
        const { payload } = await jwtVerify<User>(jwt, key, {
            algorithms: [alg]
        });
        return payload;
    } catch (e) {
        console.log("JWT Validation fail");
    }
    return null;
}