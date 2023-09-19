"use client";
import { Tab } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
function findIndexByValue(obj: Record<string, string>, value: string) {
  const keys = Object.keys(obj);
  return keys.findIndex((key) => obj[key] === value);
}

function Navigation({ username }: { username: string }) {
  const { data: session, status } = useSession({
    required: true,
  });
  const pathname = usePathname();
  if (status === "loading") return null;
  const navItems = {
    Posts: `/${username}`,
    Replies: `/${username}/with_replies`,
    Likes: `/${username}/likes`,
  };
  const selectedIndex = findIndexByValue(navItems, pathname);
  return (
    <div className="w-full px-2  ">
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List>
          <div className="flex items-center justify-around ">
            {Object.entries(navItems).map(([item, url]) => (
              <Tab as={Fragment} key={item}>
                {({ selected }) => (
                  <div className="w-full">
                    <Link
                      href={url}
                      scroll={false}
                      className="w-full flex items-center justify-center p-2 hover:bg-white/10 px-5 outline-none"
                    >
                      <div
                        className={`w-full relative flex flex-col items-center justify-center p-2 text-base ${
                          selected ? "text-white" : "text-gray-500"
                        }  font-semibold`}
                      >
                        <span>{item}</span>
                        {selected ? (
                          <div className="absolute -bottom-2 w-3/4 h-1 rounded-full bg-blue"></div>
                        ) : null}
                      </div>
                    </Link>
                  </div>
                )}
              </Tab>
            ))}
          </div>
        </Tab.List>
      </Tab.Group>
    </div>
  );
}

export default Navigation;
