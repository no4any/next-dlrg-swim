import React from "react";
import { getUSersCollection } from "./mongoClient";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from "../props";
import { User } from "../model";

const collection = getUSersCollection();

async function findUserRaw(email: string) {
    return (await collection)?.findOne({email})
}
export const findUser = React.cache(findUserRaw);

async function authUserRaw(email: string, password: string): Promise<User | null> {
    const user = await findUser(email);
    if (!user) {
        if(email === DEFAULT_USER_EMAIL) {
            if(password === DEFAULT_USER_PASSWORD) {
                return User.parse({
                    email: DEFAULT_USER_EMAIL,
                });
            }
        }
        return null;
    }
    
    if (user.password !== password) {
        return null;
    }

    return User.parse(user);
}
export const authUser = React.cache(authUserRaw);