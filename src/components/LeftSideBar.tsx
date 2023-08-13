import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { SlEnvolope } from "react-icons/sl";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: FiSearch,
  },
  {
    title: "Notifications",
    icon: IoNotificationsOutline,
  },
  {
    title: "Messages",
    icon: SlEnvolope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: IoPersonOutline,
  },
];

function LeftSideBar() {
  return (
    <header className="flex items-end h-screen fixed top-0">
      <div className="flex flex-col w-72 h-full justify-between px-2 items-stretch">
        <div className="w-full h-full flex flex-col text-xl space-y-2  p-3">
          <div className="w-full flex flex-col space-y-2 ">
            <Link href="/" className="p-4 rounded-full hover:bg-white/10 w-fit">
              <Image
                src="/twitter.svg"
                alt="twitter logo"
                width={26}
                height={26}
              ></Image>
            </Link>
          </div>
          <nav className="w-full flex flex-col space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                href={`/${item.title.toLowerCase()}`}
                key={item.title}
                className="text-white flex items-center justify-start w-fit space-x-3 p-2 px-3 rounded-3xl hover:bg-white/10 transition duration-200"
              >
                <div>
                  <item.icon className="text-3xl" />
                </div>
                <div>{item.title}</div>
              </Link>
            ))}
          </nav>
          <div className="w-full">
            <button className="w-full rounded-3xl px-8 py-2 text-lg bg-blue mx-2 hover:bg-opacity-90 font-bold">
              Post
            </button>
          </div>
        </div>
        <div className="w-full my-3">
          <button className="flex items-center justify-between space-x-2 rounded-full bg-transparent w-full p-3  text-sm  hover:bg-white/10 transition duration-200  ">
            <div className="rounded-full w-10 h-10 bg-slate-50"></div>
            <div className="text-sm text-left">
              <div className="font-bold ">Anurag Singh Chauhan</div>
              <div className="font-thin text-white/70">@anuragsingh</div>
            </div>
            <div className="">
              <BsThreeDots />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default LeftSideBar;
