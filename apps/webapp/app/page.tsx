import styles from './page.module.css';
import { api } from './api-util';
import Link from 'next/link';
import Image from 'next/image';

export default async function Index() {
  const data = await api.greeting.getGreeting.query();
  const ids = [];
  for (let i = 1; i <= 151; i++) {
    ids.push(i);
  }
  return (
    <div className={styles['page']}>
      <h1>{data.message}</h1>
      <div>
        {ids.map((id) => (
          <Link key={id} href={`/${id}`}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={`${id}`}
              height={25}
              width={25}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
