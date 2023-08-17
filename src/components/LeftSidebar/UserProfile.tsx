"use client";
import { BsThreeDots } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

import React, { Fragment } from "react";

function UserProfile() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") return;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center justify-between space-x-2 rounded-full bg-transparent w-full p-3  text-sm  hover:bg-white/10 transition duration-200  cursor-pointer h-fit">
        <div className="rounded-full w-12 h-12 bg-transparent">
          <Image
            src={session.user.image as string}
            alt="user profile image"
            width={1000}
            height={1000}
            style={{
              width: "auto",
              height: "auto",
              overflow: "hidden",
            }}
            // onError={(e) => console.error(e)}
            priority={true}
            className="rounded-full"
          ></Image>
        </div>
        <div className="text-sm text-left">
          <div className="font-bold ">{session.user.name}</div>
          <div className="font-thin text-white/70">
            @{session.user.username}
          </div>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </Menu.Button>

      <Menu.Items className="absolute right-0 -top-16 mt-2 w-64 origin-top-right   rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-custom bg-black after:block">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-custom-gray text-white" : "text-gray-900"
              } group flex w-full items-center rounded-lg p-3 text-base font-bold text-white peer/logout`}
              onClick={async () => await signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          )}
        </Menu.Item>

        <div className="w-5 h-5 bg-black absolute -bottom-2 left-[45%] rotate-45 z-0 shadow-custom-triangle peer-hover/logout:bg-custom-gray "></div>
      </Menu.Items>
    </Menu>
  );
}

export default UserProfile;
