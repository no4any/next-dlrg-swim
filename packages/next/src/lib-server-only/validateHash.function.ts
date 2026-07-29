import "server-only"

import { generateHash } from "./generateHash.function";

export async function validateHash(msg: string, hash: string): Promise<boolean> {
    const genHash = await generateHash(msg)
    return hash === genHash;
}