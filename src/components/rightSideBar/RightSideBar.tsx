import React from "react";
import { FiSearch } from "react-icons/fi";
import TrendingCard from "./TrendingCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getNews } from "@/utils/getNews";
import WhoToFollow from "./WhoToFollow";
async function RightSideBar() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();

  const data = await getNews();

  return (
    <div className="hidden lg:block w-full flex-1 h-screen self-start  sticky   top-0">
      <div className="flex flex-col w-full h-screen space-y-4 overflow-y-auto no-scrollbar">
        {/* search bar */}
        <div className="flex items-center justify-center w-full sticky top-0 bg-black py-1 z-[100]">
          <form action="#" className="w-full">
            <label htmlFor="searchbox" className="w-full relative group/search">
              <div className="absolute top-3 left-3">
                <FiSearch className="text-xl stroke-gray-500 group-focus-within/search:stroke-blue" />
              </div>
              <div className="w-full">
                <input
                  id="searchbox"
                  type="text"
                  className="rounded-3xl p-3 w-full text-sm bg-custom-gray pl-12 border border-custom-gray placeholder:text-gray-400 focus:border-blue outline-none focus:bg-transparent"
                  placeholder="Search"
                />
              </div>
            </label>
          </form>
        </div>
        {/* whats happining */}
        <div className="flex flex-col w-full bg-custom-gray rounded-2xl  space-y-3 ">
          <div className="px-4 pt-3">
            <h3 className="font-bold text-xl text-white tracking-wider">
              What&apos;s Happining
            </h3>
          </div>
          {data.map((news) => (
            <TrendingCard key={news.title} {...news} />
          ))}
        </div>

        <WhoToFollow session={session} />

        <div className="flex items-center justify-center w-full text-sm font-thin text-gray-50 pb-20">
          <span>Created by Anurag Singh Chauhan</span>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
