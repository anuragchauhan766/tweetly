import { link } from "fs";
import "../../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import GoToTopButton from "@/components/GoToTopButton";
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
        <NextAuthProvider>
          <div className="w-full h-full flex items-center justify-center relative text-white">
            <div className=" max-w-screen-xl w-full h-full relative flex flex-row">
              <LeftSideBar />
              <main className="ml-72 h-full w-full">
                <div className="w-full flex items-center justify-center space-x-4">
                  {children}
                  <RightSideBar />
                </div>
              </main>
              <GoToTopButton />
            </div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
