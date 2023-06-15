import { publicProcedure, router } from './trpc';
import { greetingRouter } from './routes/greeting';
import { z } from 'zod';

export const appRouter = router({
  greeting: greetingRouter,
  // pokemon: router({
  //   getPokemon: publicProcedure
  //     .input(z.coerce.number())
  //     .query(async ({ input }) => {
  //       const pokemon = await fetchPokemon(input);
  //       return pokemon;
  //     }),
  // }),
});

export type AppRouter = typeof appRouter;

const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.enum([
          'hp',
          'attack',
          'defense',
          'special-attack',
          'special-defense',
          'speed',
        ]),
      }),
    })
  ),
  types: z.array(
    z.object({
      type: z.object({
        name: z.enum([
          'normal',
          'fighting',
          'flying',
          'poison',
          'ground',
          'rock',
          'bug',
          'ghost',
          'steel',
          'fire',
          'water',
          'grass',
          'electric',
          'psychic',
          'ice',
          'dragon',
          'dark',
          'fairy',
        ]),
      }),
    })
  ),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  assertIsPokemon(data);
  return data;
}

function assertIsPokemon(data: unknown): asserts data is Pokemon {
  if (!pokemonSchema.safeParse(data).success) {
    throw new Error('Invalid pokemon data');
  }
}
