import { User, UserWithPassword } from '@next-dlrg-swim/models';
import { publicProcedure, router } from '../trpc.ts';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const users: UserWithPassword[] = [];

export const swimmerRouter = router({
    add: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .mutation(async function (opts) {
            const user = opts.input;
            if (users.find(u => u.username === user.username)) throw new TRPCError({ code: 'CONFLICT', message: 'User already exists' });
            users.push(user);
            return user;
        }),
    list: publicProcedure
        .input(z.void())
        .query(async () => {
            return users;
        }),
    delete: publicProcedure
        .input(z.string())
        .output(z.void())
        .mutation(async function (opts) {
            
        }),
    updatePassword: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .mutation(async function (opts) {
            return opts.input
        }),
    setAdmin: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .mutation(async function (opts) {
            return opts.input
        }),
    validate: publicProcedure
        .input(UserWithPassword)
        .output(User)
        .query(async function (opts) {
            return opts.input;
        })
});

export type SwimmerRouter = typeof swimmerRouter;