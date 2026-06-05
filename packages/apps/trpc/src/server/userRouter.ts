import { User, UserWithPassword } from '@next-dlrg-swim/models';
import { publicProcedure, router } from './trpc.ts';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
const users: UserWithPassword[] = [];

export const userRouter = router({
    add: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .mutation(async function (opts) {
            const user = opts.input;
            if(users.find(u => u.username === user.username)) throw new TRPCError({code: 'CONFLICT', message: 'User already exists'});
            users.push(user);
            return user;
        }),
    list: publicProcedure
        .input(z.void())
        .query(async () => {
            return users;
        }),
    validate: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .query(async function (opts) {
            return opts.input;
        })
});

export type UserRouter = typeof userRouter;