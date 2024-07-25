"use client";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
function findIndexByValue(obj: Record<string, string>, value: string) {
  const keys = Object.keys(obj);
  return keys.findIndex((key) => obj[key] === value);
}
interface NavigationProps {
  username: string;
  navItems: {
    [key: string]: string;
  };
}
function Navigation(props: NavigationProps) {
  const pathname = usePathname();

  const selectedIndex = findIndexByValue(props.navItems, pathname);
  return (
    <div className="w-full px-2">
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List>
          <div className="flex items-center justify-around">
            {Object.entries(props.navItems).map(([item, url]) => (
              <Tab as={Fragment} key={item}>
                {({ selected }) => (
                  <div className="w-full">
                    <Link
                      href={url}
                      className="flex w-full items-center justify-center p-2 px-5 outline-none hover:bg-white/10"
                    >
                      <div
                        className={`relative flex w-full flex-col items-center justify-center p-2 text-base ${
                          selected ? "text-white" : "text-gray-500"
                        } font-semibold`}
                      >
                        <span>{item}</span>
                        {selected ? (
                          <div className="absolute -bottom-2 h-1 w-3/4 rounded-full bg-blue"></div>
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
