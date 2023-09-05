"use client";
import GoBackButton from "@/components/common/button/GoBackButton";
import ProfileImages from "@/components/common/ProfileImages";
import { useParams } from "next/navigation";

function NotFound() {
  const { username } = useParams();

  return (
    <div className=" w-full">
      {/* top header bar */}
      <div className="w-full  font-bold text-xl p-1 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 gap-6 ps-2">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">Profile</span>
        </div>
      </div>

      <div className="w-fulll flex flex-col">
        {/* cover image */}
        <div className="w-full h-52">
          <div className="w-full h-full bg-white/25 "></div>
        </div>
        {/* Profile details */}
        <div className="p-2 " data-testid="UserProfileInfo">
          <div className="w-full flex justify-between items-start">
            <div className=" relative w-1/4 h-full">
              <div
                className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-visible"
                data-testid="user-Profile-photo"
              >
                <ProfileImages
                  ImgUrl={null}
                  className="w-32 h-32 min-w-[40px] border-4"
                />
              </div>
            </div>
          </div>
          <div className="mt-20">
            <span className="text-xl font-bold ">@{username}</span>
          </div>
          <div className=" flex items-center justify-center  my-5 mx-10">
            <div className="flex items-center justify-start max-w-xs w-full flex-wrap py-10 gap-2">
              <span className="text-3xl font-bold">
                This Account doesn&apos;t exist
              </span>
              <span className="text-base font-light text-gray-500">
                Try searching for another
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
