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
        <section className='border-b px-3 '>
          <header className='flex max-w-5xl flex-wrap justify-between lg:mx-auto'>
            <h1 className='my-2 font-display text-5xl'>
              <a href='/'>Let Kids Travel</a>
            </h1>
            <aside className='my-2 flex flex-wrap content-center gap-2 text-black'>
              <div className='relative h-8 w-8'>
                <form
                  action='http://www.google.com/search'
                  method='get'
                  target='_blank'>
                  <input
                    className='absolute right-0 h-8 w-full rounded-full bg-slate-100 px-2 py-2 leading-none outline-offset-1 outline-sky-900 transition-all duration-200 ease-in-out focus:w-64 focus:outline-2'
                    id='search'
                    name='q'
                    placeholder='Search'
                    type='text'
                  />
                  <label
                    className='absolute left-0 top-0 rounded-full bg-slate-100 px-2 py-2 leading-none'
                    htmlFor='search'>
                    <FaSearch title='Search' />
                  </label>
                  <input
                    name='q'
                    type='hidden'
                    value='site:letkidstravel.com'
                  />
                </form>
              </div>

              <a
                className='rounded-full bg-slate-100 px-2 py-2 leading-none'
                href='https://instagram.com/letkidstravel'
                target='_blank'>
                <FaInstagram title='Follow us on Instagram!' />
              </a>
            </aside>
          </header>
        </section>

        {children}

        <section className='border-t bg-sky-950 px-3 text-white'>
          <footer className='mx-3 max-w-5xl py-8 lg:mx-auto'>
            Made with love freely given, graciously received, and joyfully
            shared. Copyright &copy; {new Date().getFullYear()}.
          </footer>
        </section>
      </body>
    </html>
  );
}
