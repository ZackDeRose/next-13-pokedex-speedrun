import { router, publicProcedure } from '../trpc';

export const greetingRouter = router({
  getGreeting: publicProcedure.query(async () => {
    return { message: 'Welcome to Pokedex!!!' };
  }),
});
