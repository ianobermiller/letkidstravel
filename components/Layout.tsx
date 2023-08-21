import { ReactNode } from 'react';
import { FaInstagram, FaSearch } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: Props) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>{(title ? `${title} - ` : '') + 'Let Kids Travel'}</title>
        <link href='/index.css' rel='stylesheet' />
      </head>
      <body>
        <section className='mb-4 border-b px-3'>
          <header className='flex max-w-5xl flex-wrap justify-between lg:mx-auto'>
            <h1 className='my-2 font-display text-5xl'>
              <a href='/'>Let Kids Travel</a>
            </h1>
            <aside className='my-2 flex flex-wrap content-center gap-2 '>
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
        </section>
        {children}
        <section className='mt-4 border-t px-3'>
          <footer className='mx-3 max-w-5xl py-8 lg:mx-auto'>
            Made with love freely given, graciously received, and joyfully
            shared. Copyright &copy; {new Date().getFullYear()}.
          </footer>
        </section>
      </body>
    </html>
  );
}
