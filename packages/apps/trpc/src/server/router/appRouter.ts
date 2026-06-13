import { router } from "../trpc.ts";
import { registrationRouter } from "./registrationRouter.ts";
import { swimmerRouter } from "./swimmerRouter.ts";
import { userRouter } from "./userRouter.ts";

export const appRouter = router({
  user: userRouter,
  swimmer: swimmerRouter,
  registration: registrationRouter
});

export type AppRouter = typeof appRouter;