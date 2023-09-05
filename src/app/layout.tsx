import "./globals.css";
import type { Metadata } from "next";

import { NextAuthProvider } from "@/components/Auth/Provider";

export const metadata: Metadata = {
  title: "Twitter",
  description: "Twitter clone app for development and learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          rel="icon"
          href="/twitter.svg"
          style={{ width: "10px", height: "auto" }}
          as="icons"
        />
      </head>

      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
