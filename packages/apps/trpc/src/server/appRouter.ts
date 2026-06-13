import { registrationRouter } from "./router/registrationRouter.ts";
import { userRouter } from "./router/userRouter.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  user: userRouter,
  post: userRouter,
  registration: registrationRouter
});

export type AppRouter = typeof appRouter;