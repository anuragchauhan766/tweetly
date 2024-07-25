"use client";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
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
import { useLoginDialog } from "@/context/LoginDialogContext";

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
function MobileBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoginDialogVisible } = useLoginDialog();
  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }

    return pathname.startsWith(path);
  };

  const handleNavigation = (title: string) => {
    if (title === "Profile" && session === null) {
      setIsLoginDialogVisible(true);
    } else {
      const path =
        title === "Profile"
          ? `/${session?.user.username || ""}`
          : `/${title.toLowerCase()}`;
      router.push(path);
    }
  };
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[50] flex h-16 w-full flex-row items-center justify-around space-y-2 bg-black xs:hidden">
      {NAVIGATION_ITEMS.map(({ title, icon: Icon, activeIcon: ActiveIcon }) => (
        <button
          onClick={() => handleNavigation(title)}
          key={title}
          className={`flex w-fit items-center justify-start space-x-3 rounded-3xl p-2 text-white transition duration-200 hover:bg-white/10 xl:px-3`}
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
            } `}
          >
            {title}
          </div>
        </button>
      ))}
      <div className="fixed bottom-20 right-5 flex items-center justify-center">
        <ComposeTweet ClassName="w-8 h-8" session={session} />
      </div>
    </nav>
  );
}

export default MobileBar;
