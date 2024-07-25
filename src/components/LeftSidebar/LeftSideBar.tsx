import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BiSolidPaperPlane } from "react-icons/bi";
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
              className="w-fit rounded-full p-2 hover:bg-white/10 xl:p-3"
            >
              <div className="relative flex items-center justify-center gap-4 font-extrabold">
                <BiSolidPaperPlane className="h-8 w-8" />
                <span className="hidden text-3xl xl:inline">Tweetly</span>
              </div>
            </Link>
          </div>
          <Navigation session={session} />
          <div className="h-full w-full">
            <ComposeTweet ClassName="w-4 h-4" session={session} />
          </div>
        </div>
        <div className="my-3 w-full p-3">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default LeftSideBar;
