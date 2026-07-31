export async function flat<T>(obj: T): Promise<T> {
    return JSON.parse(JSON.stringify(obj));
}