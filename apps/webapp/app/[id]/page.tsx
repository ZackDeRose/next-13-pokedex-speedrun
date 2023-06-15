import Image from 'next/image';
import { api } from '../api-util';
import Link from 'next/link';
import { fetchPokemon } from '@acme/api';

export async function generateStaticParams() {
  const ids = [];
  for (let i = 1; i <= 151; i++) {
    ids.push({ id: i.toString() });
  }
  return ids;
}

export default async function PokemonPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const pokemon = await fetchPokemon(+id);
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        height={100}
        width={100}
      />
      <h2>Type: {pokemon.types.map((x) => x.type.name).join(' | ')}</h2>
      <h2>Stats</h2>
      {pokemon.stats.map((x) => (
        <div key={x.stat.name}>
          <h3>
            {x.stat.name}: {x.base_stat}
          </h3>
        </div>
      ))}
      {pokemon.id > 1 && (
        <Link href={`/${pokemon.id - 1}`}>
          Previous
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id - 1
            }.png`}
            alt="previous"
            height={100}
            width={100}
          />
        </Link>
      )}
      {pokemon.id < 151 && (
        <Link href={`/${pokemon.id + 1}`}>
          Next
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.id + 1
            }.png`}
            alt="next"
            height={100}
            width={100}
          />
        </Link>
      )}
    </div>
  );
}
