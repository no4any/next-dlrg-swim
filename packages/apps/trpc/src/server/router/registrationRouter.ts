import { Registration } from '@next-dlrg-swim/models';
import { publicProcedure, router } from '../trpc.ts';
import { z } from 'zod';
import { WithMongoId } from '../model/WithMongoId.zod.ts';
import { client } from '../mongoClient.ts';
import { TRPCError } from '@trpc/server';

export const registrationRouter = router({
    register: publicProcedure
        .input(Registration)
        .output(Registration)
        .mutation(async function (opts) {
            const collection = (await client).db("dlrg").collection<Registration>("registration");
            const result = await collection.insertOne(opts.input)
            const inserted = await collection.findOne({
                _id: result.insertedId
            })

            if(!inserted) {
                throw new TRPCError({
                    code: 'NOT_FOUND'
                })
            }

            return Registration.parse(inserted);
        }),
    addSwimmer: publicProcedure
        .input(z.void())
        .output(z.void())
        .mutation(async function (opts) {}),
});

export type RegistrationRouter = typeof registrationRouter;