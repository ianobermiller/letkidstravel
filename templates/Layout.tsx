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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <link rel="stylesheet" href="/index.css" />
      <body>
        <h1>
          <a href="/">Let Kids Travel</a>
        </h1>
        {children}
      </body>
    </html>
  );
}
