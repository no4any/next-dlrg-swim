import { router } from "../trpc.ts";
import { swimmerRouter } from "./swimmerRouter.ts";
import { userRouter } from "./userRouter.ts";

export const appRouter = router({
  user: userRouter,
  swimmer: swimmerRouter
});

export type AppRouter = typeof appRouter;