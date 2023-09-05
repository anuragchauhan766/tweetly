"use client";
import Link from "next/link";
import FollowButton from "../common/button/FollowButton";

function ProfileCard() {
  return (
    <div className="w-full flex items-center last:rounded-b-2xl hover:bg-white/10 transition duration-200 px-4 py-3  bg-transparent">
      <Link href="#" className="flex items-center space-x-2  w-full text-sm">
        <div className="rounded-full w-10 h-10 bg-slate-50"></div>
        <div className="text-sm text-left">
          <div className="font-bold text-base">Anurag Singh Chauhan</div>
          <div className="font-thin text-white/70 text-sm">@anuragsingh</div>
        </div>
      </Link>
      <div className="">
        <FollowButton />
      </div>
    </div>
  );
}

export default ProfileCard;
