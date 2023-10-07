import React from "react";
import { GiFeather } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "./UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navigation from "./Navigation";
import ComposeTweet from "../common/button/ComposeTweet";

async function LeftSideBar() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <header className="hidden xs:flex items-end h-screen fixed top-0 z-50">
      <div className="flex flex-col w-20 xl:w-72 h-full justify-between px-2 items-stretch">
        <div className="w-full h-full flex flex-col text-xl space-y-2  p-3">
          <div className="flex flex-col space-y-2  w-full">
            <Link
              href="/"
              className="p-2 xl:p-4 rounded-full hover:bg-white/10  w-fit"
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
          <div className="w-full h-full">
            <ComposeTweet ClassName="w-4 h-4" />
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
