const SALT = process.env.SALT || 'salt';

export async function generateHash(msg:string) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${SALT}${msg}`));
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}