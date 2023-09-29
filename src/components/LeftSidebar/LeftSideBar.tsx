import React from "react";

import Link from "next/link";
import Image from "next/image";
import UserProfile from "./UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navigation from "./Navigation";

async function LeftSideBar() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <header className="flex items-end h-screen fixed top-0">
      <div className="flex flex-col w-72 h-full justify-between px-2 items-stretch">
        <div className="w-full h-full flex flex-col text-xl space-y-2  p-3">
          <div className="flex flex-col space-y-2  w-full">
            <Link
              href="/"
              className="p-4 rounded-full hover:bg-white/10  w-fit"
            >
              <div className="relative w-6 h-6 ">
                <Image
                  src="/twitter.svg"
                  alt="twitter logo"
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 20px"
                ></Image>
              </div>
            </Link>
          </div>
          <Navigation session={session} />
          <div className="w-full">
            <button className="w-full rounded-3xl px-8 py-2 text-lg bg-blue mx-2 hover:bg-opacity-80 font-bold">
              Post
            </button>
          </div>
        </div>
        <div className="w-full my-3">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default LeftSideBar;
