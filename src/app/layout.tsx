import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextAuthProvider } from "@/components/Auth/Provider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

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
        <link rel="icon" href="/twitter.svg" sizes="any" />
      </head>

      <body className={roboto.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
