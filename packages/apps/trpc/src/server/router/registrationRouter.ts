import { Registration } from '@next-dlrg-swim/models';
import { publicProcedure, router } from '../trpc.ts';
import { TRPCError } from '@trpc/server';
import { getCollection } from '../mongoClient.ts';
import {z} from 'zod';

const REGISTRATION_COLLECTION = process.env.REGISTRATION_COLLECTION || 'registration';

const collection = (async () => {
    const col = await getCollection<Registration>(REGISTRATION_COLLECTION);
    col.createIndex({email: 1}, {unique: true});
    return col;
})()

export const registrationRouter = router({
    register: publicProcedure
        .input(Registration)
        .output(z.string())
        .mutation(async function (opts) {
            const col = await collection;
            const id = (await col.insertOne(opts.input)).insertedId?.toString();
            if(!id) {
                throw new TRPCError({
                    code: 'BAD_REQUEST'
                })
            }
            return id;
        }),
    getAll: publicProcedure
        .input(z.void())
        .output(z.array(Registration))
        .query(async function () {
            const col = await collection;
            const result = z.array(Registration).parse(await col.find().toArray())
            return result;
        })
});

export type RegistrationRouter = typeof registrationRouter;