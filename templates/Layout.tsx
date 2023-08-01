import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{title}</title>
        <link href="/index.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <footer>
          Made with love freely given, graciously received, and joyfully shared.
          Copyright &copy; {new Date().getFullYear()}.
        </footer>
      </body>
    </html>
  );
}
