"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { BsThreeDots } from "react-icons/bs";
import { CgLogIn } from "react-icons/cg";
import ProfileImages from "../common/ProfileImages";
import { useLoginDialog } from "@/context/LoginDialogContext";

function UserProfile() {
  const { data: session } = useSession();
  const { setIsLoginDialogVisible } = useLoginDialog();
  const handleMenuClick = () => {
    if (!session) {
      setIsLoginDialogVisible(true);
    }
  };
  return (
    <Menu as="div" className="relative">
      {session ? (
        <MenuButton className="flex h-fit w-full cursor-pointer items-center justify-around rounded-full border border-white/40 text-sm text-white transition duration-200 hover:bg-white/10 xs:p-2 xl:p-3">
          <ProfileImages
            ImgUrl={session.user.image}
            className="h-10 w-10 xs:h-12 xs:w-12"
          />

          <div className="hidden items-center justify-between space-x-2 xl:flex">
            <div className="text-left text-sm">
              <div className="font-bold">{session.user.name}</div>
              <div className="font-thin text-white/70">
                @{session.user.username}
              </div>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
        </MenuButton>
      ) : (
        <button
          className="flex h-fit cursor-pointer items-center justify-around rounded-full border border-white/40 p-2 font-bold text-white transition duration-200 hover:bg-white/10 max-xs:hidden xs:p-2 xl:w-full xl:p-3"
          onClick={handleMenuClick}
        >
          <CgLogIn className="h-6 w-6 xl:hidden" />
          <span className="hidden xl:inline">Sign Up</span>
        </button>
      )}
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <MenuItems className="absolute -bottom-16 left-0 mt-2 h-fit w-64 origin-bottom-right rounded-xl bg-black shadow-custom ring-1 ring-black ring-opacity-5 focus:outline-none xs:-top-16 xs:origin-top-right">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-custom-gray text-white"
                                  : "text-gray-900"
                              } peer/logout group flex w-full items-center rounded-xl p-3 text-base font-bold text-white`}
                              onClick={async () => await signOut()}
                            >
                              Logout
                            </button>
                          )}
                        </MenuItem>

                        <div className="absolute -top-2.5 left-3 z-0 h-5 w-5 rotate-45 bg-black shadow-custom-triangle-upper peer-hover/logout:bg-custom-gray xs:-bottom-2 xs:left-5 xs:top-auto xs:shadow-custom-triangle-lower xl:left-[45%]"></div>
                      </MenuItems>
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
