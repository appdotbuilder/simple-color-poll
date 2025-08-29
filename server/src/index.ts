import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas and handlers
import { castVoteInputSchema } from './schema';
import { castVote } from './handlers/cast_vote';
import { getVoteResults } from './handlers/get_vote_results';
import { getPollInfo } from './handlers/get_poll_info';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Cast a vote for one of the poll options
  castVote: publicProcedure
    .input(castVoteInputSchema)
    .mutation(({ input }) => castVote(input)),
  
  // Get real-time voting results
  getVoteResults: publicProcedure
    .query(() => getVoteResults()),
  
  // Get poll information (topic and options)
  getPollInfo: publicProcedure
    .query(() => getPollInfo()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();