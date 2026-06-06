import { userRouter } from "./router/userRouter.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  user: userRouter,
  post: userRouter
});

export type AppRouter = typeof appRouter;