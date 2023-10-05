"use client";
import { BiHomeCircle, BiSolidHomeCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import {
  IoMail,
  IoMailOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";

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
function Navigation(props: { session: Session }) {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }

    return pathname.startsWith(path);
  };

  return (
    <nav className="w-full flex flex-col space-y-2">
      {NAVIGATION_ITEMS.map(({ title, icon: Icon, activeIcon: ActiveIcon }) => (
        <Link
          href={`/${
            title === "Profile"
              ? props.session.user.username
              : title.toLocaleLowerCase()
          }`}
          key={title}
          className={`text-white flex items-center justify-start w-fit space-x-3 p-2 px-3 rounded-3xl hover:bg-white/10 transition duration-200`}
        >
          <div>
            {isActivePath("/" + title.toLocaleLowerCase()) ? (
              <ActiveIcon className="text-3xl" />
            ) : (
              <Icon className="text-3xl" />
            )}
          </div>
          <div
            className={
              isActivePath("/" + title.toLocaleLowerCase()) ? "font-bold" : ""
            }
          >
            {title}
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
