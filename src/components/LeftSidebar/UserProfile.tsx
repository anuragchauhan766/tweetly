"use client";
import { BsThreeDots } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";

import ProfileImages from "../common/ProfileImages";

function UserProfile() {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-gray-600"></div>;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center justify-around  rounded-full  w-full xs:p-2 xl:p-3  text-sm  hover:bg-white/10 transition duration-200  cursor-pointer h-fit">
        <ProfileImages
          ImgUrl={session.user.image}
          className="w-10 h-10 xs:w-12 xs:h-12"
        />
        <div className="hidden xl:flex items-center justify-between space-x-2">
          <div className="text-sm text-left">
            <div className="font-bold ">{session.user.name}</div>
            <div className="font-thin text-white/70">
              @{session.user.username}
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
      </Menu.Button>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <Menu.Items className="absolute left-0 -bottom-16 h-fit xs:-top-16 mt-2 w-64 origin-bottom-right xs:origin-top-right   rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none shadow-custom bg-black  ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-custom-gray text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-xl p-3 text-base font-bold text-white peer/logout`}
                              onClick={async () =>
                                await signOut({ callbackUrl: "/" })
                              }
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>

                        <div className="w-5 h-5 bg-black absolute -top-2.5 xs:top-auto  xs:-bottom-2 left-3 xs:left-5 xl:left-[45%] rotate-45  shadow-custom-triangle-upper xs:shadow-custom-triangle-lower peer-hover/logout:bg-custom-gray z-0 "></div>
                      </Menu.Items>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

export default UserProfile;
