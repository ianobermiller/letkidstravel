import { Layout } from '../templates/Layout';
import { PostData } from '../types';

interface Props {
  posts: Array<PostData>;
}

export default function Destinations({ posts }: Props) {
  const countries = [
    ...new Set(posts.map(post => post.country || post.state).filter(Boolean)),
  ];

  return (
    <Layout headingColor='light' title='Let Kids Travel'>
      <div className='home-header'>
        <div className='image' />
        <div className='blurb'>
          <span className='wave'>👋</span>Hi, we’re Olivia and Ian. We travel
          with our four children enjoying architecture, nature, baked goods,
          coffee, chocolate and most importantly living for Jesus.
        </div>
      </div>

      <ul>
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
              <ul>
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
