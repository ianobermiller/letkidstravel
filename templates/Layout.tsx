import { ReactNode } from "react";

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
      <body>
        <header>
          <h1 className={headingColor}>
            <a href="/">Let Kids Travel</a>
          </h1>
          <aside>
            <input placeholder="Search..." type="search" />
            <a href="https://instagram.com/letkidstravel">Insta</a>
          </aside>
        </header>
        {children}
        <footer>
          Made with love freely given, graciously received, and joyfully shared.
          Copyright &copy; {new Date().getFullYear()}.
        </footer>
      </body>
    </html>
  );
}
