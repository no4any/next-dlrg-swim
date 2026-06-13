import { publicProcedure, router } from '../trpc.ts';
import { z } from 'zod';

export const registrationRouter = router({
    addTeam: publicProcedure
        .input(z.void())
        .output(z.void())
        .mutation(async function (opts) {}),
    addSwimmer: publicProcedure
        .input(z.void())
        .output(z.void())
        .mutation(async function (opts) {}),
});

export type RegistrationRouter = typeof registrationRouter;