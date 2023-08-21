import { Layout } from '../components/Layout';
import { MainHeader } from '../components/MainHeader';
import { PostData } from '../types';
import { H2 } from './../components/H2';

interface Props {
  posts: Array<PostData>;
}

export default function Destinations({ posts }: Props) {
  const countries = [
    ...new Set(posts.map(post => post.country || post.state).filter(Boolean)),
  ];

  return (
    <Layout title='Destinations'>
      <MainHeader />

      <H2>Destinations</H2>

      <ul className='list-disc pl-5'>
        {countries.map(country => {
          const uniqueCities = [
            ...new Set(
              posts
                .filter(p => p.country === country || p.state === country)
                .map(p => p.city)
                .filter(Boolean),
            ),
          ];
          return (
            <li key={country}>
              {country}
              <ul className='list-disc pl-5'>
                {uniqueCities.map(city => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
