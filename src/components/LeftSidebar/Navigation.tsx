"use client";

import { useLoginDialog } from "@/context/LoginDialogContext";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { BiHomeCircle, BiSolidHomeCircle } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import {
  IoMail,
  IoMailOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";

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
    title: "Messages",
    icon: IoMailOutline,
    activeIcon: IoMail,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
    activeIcon: BsBookmarkFill,
  },
  {
    title: "Profile",
    icon: IoPersonOutline,
    activeIcon: IoPerson,
  },
];
function Navigation({ session }: { session: Session | null }) {
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
    <nav className="flex w-full flex-col space-y-2">
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
    </nav>
  );
}

export default Navigation;
