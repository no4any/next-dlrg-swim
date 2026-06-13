import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/appRouter.ts';

const PORT = process.env.TRPC_PORT || 3001;
const HOST = process.env.TRPC_HOST || '127.0.0.1'; 

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://${HOST}:${PORT}`,
    }),
  ],
});