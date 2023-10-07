"use client";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import React from "react";
import { BiHomeCircle, BiSolidHomeCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

import {
  IoNotifications,
  IoNotificationsOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { GiFeather } from "react-icons/gi";
import ComposeTweet from "../common/button/ComposeTweet";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: BiHomeCircle,
    activeIcon: BiSolidHomeCircle,
  },
  {
    title: "Explore",
    icon: FiSearch,
    activeIcon: FaSearch,
  },
  {
    title: "Notifications",
    icon: IoNotificationsOutline,
    activeIcon: IoNotifications,
  },
  {
    title: "Profile",
    icon: IoPersonOutline,
    activeIcon: IoPerson,
  },
];
function MobileBar(props: { session: Session }) {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }

    return pathname.startsWith(path);
  };
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full flex xs:hidden flex-row items-center justify-around space-y-2 bg-black h-16 z-[50]">
      {NAVIGATION_ITEMS.map(({ title, icon: Icon, activeIcon: ActiveIcon }) => (
        <Link
          href={`/${
            title === "Profile"
              ? props.session.user.username
              : title.toLocaleLowerCase()
          }`}
          key={title}
          className={`text-white flex items-center justify-start w-fit space-x-3 p-2 xl:px-3 rounded-3xl hover:bg-white/10 transition duration-200 `}
        >
          <div>
            {isActivePath("/" + title.toLocaleLowerCase()) ? (
              <ActiveIcon className="text-2xl xl:text-3xl" />
            ) : (
              <Icon className="text-2xl xl:text-3xl" />
            )}
          </div>
          <div
            className={`hidden xl:block ${
              isActivePath("/" + title.toLocaleLowerCase()) ? "font-bold" : ""
            }
              `}
          >
            {title}
          </div>
        </Link>
      ))}
      <div className="fixed bottom-20 right-5 flex items-center justify-center ">
        <ComposeTweet ClassName="w-8 h-8" />
      </div>
    </nav>
  );
}

export default MobileBar;
