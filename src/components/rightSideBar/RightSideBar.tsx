import { authOptions } from "@/lib/auth";
import { getNews } from "@/utils/getNews";
import { getServerSession } from "next-auth";
import { FiSearch } from "react-icons/fi";
import TrendingCard from "./TrendingCard";
import WhoToFollow from "./WhoToFollow";
async function RightSideBar() {
  const session = await getServerSession(authOptions);

  const data = await getNews();

  return (
    <div className="sticky top-0 hidden h-screen w-full flex-1 self-start lg:block">
      <div className="scrollbar flex h-screen w-full flex-col space-y-4 overflow-y-auto">
        {/* search bar */}
        <div className="sticky top-0 z-[100] flex w-full items-center justify-center bg-black py-1">
          <label htmlFor="searchbox" className="group/search relative w-full">
            <div className="absolute left-3 top-3">
              <FiSearch className="stroke-gray-500 text-xl group-focus-within/search:stroke-blue" />
            </div>
            <div className="w-full">
              <input
                id="searchbox"
                type="text"
                className="w-full rounded-3xl border border-custom-gray bg-custom-gray p-3 pl-12 text-sm outline-none placeholder:text-gray-400 focus:border-blue focus:bg-transparent"
                placeholder="Search"
              />
            </div>
          </label>
        </div>
        {/* whats happining */}
        <div className="flex w-full flex-col space-y-3 rounded-2xl bg-custom-gray">
          <div className="px-4 pt-3">
            <h3 className="text-xl font-bold tracking-wider text-white">
              What&apos;s Happining
            </h3>
          </div>
          {data.map((news) => (
            <TrendingCard key={news.title} {...news} />
          ))}
        </div>

        <WhoToFollow session={session} />

        <div className="flex w-full items-center justify-center pb-20 text-sm font-thin text-gray-50">
          <span>Created by Anurag Singh Chauhan</span>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
