import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Blog</title>
      </head>
      <body>
        <header>
          <h1>Welcome to My Blog</h1>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/articles">Articles</a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; 2021 My Blog</p>
        </footer>
      </body>
    </html>
  );
}
