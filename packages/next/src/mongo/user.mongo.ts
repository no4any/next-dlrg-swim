import React from "react";
import { getUSersCollection } from "./mongoClient";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from "../props";
import { User, UserWithPassword } from "../model";
import { generateHash } from "../lib-server-only";

const collection = getUSersCollection();

export async function addUser(email: string, password: string) {
    const user = UserWithPassword.parse({
        email,
        password: await generateHash(password),
        isAdmin: false,
    });
    const result = await (await collection)?.insertOne(user)
    return result.insertedId;
}

export async function updateUserPassword(email: string, password: string) {
    const result = await (await collection)?.updateOne(
        { email },
        { $set: { password: await generateHash(password) } }
    );
    return result.modifiedCount > 0;
}

async function findUserRaw(email: string) {
    return (await collection)?.findOne({ email })
}
export const findUser = React.cache(findUserRaw);

async function authUserRaw(email: string, password: string): Promise<User | null> {
    const user = await findUser(email);
    if (!user) {
        if (email === DEFAULT_USER_EMAIL) {
            if (password === DEFAULT_USER_PASSWORD) {
                const result = await addUser(DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD);
                if(result) { console.log('Default user created') }
                return User.parse({
                    email: DEFAULT_USER_EMAIL,
                });
            }
        }
        return null;
    } else {
        if (await generateHash(password) !== user?.password) {
            console.log("---")
            return null;
        }
    }

    return User.parse({...user, _id: user._id?.toString() ?? ""});
}
export const authUser = React.cache(authUserRaw);