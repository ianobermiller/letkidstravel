import { ReactNode } from "react";
import { FaInstagram } from "react-icons/fa";

interface Props {
  children: ReactNode;
  headingColor?: "dark" | "light";
  title: string;
}

export function Layout({ children, headingColor = "dark", title }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{title}</title>
        <link href="/index.css" rel="stylesheet" />
      </head>
      <body className="mx-3">
        <header className="flex flex-col">
          <h1 className="font-display text-5xl my-2">
            <a href="/">Let Kids Travel</a>
          </h1>
          <aside className="flex gap-2 my-2">
            <input
              className="bg-slate-100 rounded-full px-4 py-2 leading-none w-48"
              placeholder="Search..."
              type="search"
            />
            <a
              className="bg-slate-100 rounded-full px-2 py-2 leading-none"
              href="https://instagram.com/letkidstravel"
            >
              <FaInstagram title="Follow us on Instagram!" />
            </a>
          </aside>
        </header>
        {children}
        <footer className="py-8">
          Made with love freely given, graciously received, and joyfully shared.
          Copyright &copy; {new Date().getFullYear()}.
        </footer>
      </body>
    </html>
  );
}
