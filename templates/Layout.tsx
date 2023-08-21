import { ReactNode } from 'react';
import { FaInstagram, FaSearch } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  headingColor?: 'dark' | 'light';
  title: string;
}

export function Layout({ children, headingColor = 'dark', title }: Props) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>{title}</title>
        <link href='/index.css' rel='stylesheet' />
      </head>
      <body className='mx-3'>
        <header className='flex flex-wrap content-start justify-between'>
          <h1 className='my-2 font-display text-5xl'>
            <a href='/'>Let Kids Travel</a>
          </h1>
          <aside className='my-2 flex flex-wrap content-start gap-2 '>
            <a
              className='rounded-full bg-slate-100 px-2 py-2 leading-none'
              href='https://instagram.com/letkidstravel'>
              <FaSearch title='Search' />
            </a>
            <a
              className='rounded-full bg-slate-100 px-2 py-2 leading-none'
              href='https://instagram.com/letkidstravel'>
              <FaInstagram title='Follow us on Instagram!' />
            </a>
          </aside>
        </header>
        {children}
        <footer className='py-8'>
          Made with love freely given, graciously received, and joyfully shared.
          Copyright &copy; {new Date().getFullYear()}.
        </footer>
      </body>
    </html>
  );
}
