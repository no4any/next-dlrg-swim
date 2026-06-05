import { router } from "./trpc.ts";
import { userRouter } from "./userRouter.ts";

export const appRouter = router({
  user: userRouter,
  post: userRouter
});

export type AppRouter = typeof appRouter;