import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import ComposeTweet from "../common/button/ComposeTweet";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";

async function LeftSideBar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 z-50 hidden h-screen items-end xs:flex">
      <div className="flex h-full w-20 flex-col items-stretch justify-between px-2 xl:w-72">
        <div className="flex h-full w-full flex-col space-y-2 p-3 text-xl">
          <div className="flex w-full flex-col space-y-2">
            <Link
              href="/"
              className="w-fit rounded-full p-2 hover:bg-white/10 xl:p-4"
            >
              <div className="relative h-6 w-6">
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
          <div className="h-full w-full">
            <ComposeTweet ClassName="w-4 h-4" session={session} />
          </div>
        </div>
        <div className="my-3 w-full">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default LeftSideBar;
