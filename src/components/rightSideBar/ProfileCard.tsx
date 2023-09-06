"use client";
import Link from "next/link";
import FollowButton from "../common/button/FollowButton";
import type { ProfileCardProps } from "@/types/User";
import ProfileImages from "../common/ProfileImages";

function ProfileCard(props: ProfileCardProps) {
  function name(name: string | null, MaxLength: number) {
    if (!name) return null;
    if (name.length > MaxLength) {
      return name.substring(0, MaxLength) + "...";
    }
    return name;
  }
  return (
    <div className="w-full flex items-center last:rounded-b-2xl hover:bg-white/10 transition duration-200 px-4 py-3  bg-transparent">
      <Link
        href={`/${props.username}`}
        className="flex items-center space-x-2  w-full text-sm"
      >
        {/* <div className="rounded-full w-10 h-10 bg-slate-50"></div> */}
        <ProfileImages ImgUrl={props.image} className="w-10 h-10" />
        <div className="flex flex-col items-start justify-center text-sm text-left whitespace-nowrap">
          <span className="font-bold text-base hover:underline hover:decoration-1">
            {name(props.name, 17)}
          </span>
          <span className="font-thin text-white/70 text-sm">
            @{props.username}
          </span>
        </div>
      </Link>
      <div className="">
        <FollowButton />
      </div>
    </div>
  );
}

export default ProfileCard;
