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
    <div className="flex w-full items-center bg-transparent px-4 py-3 transition duration-200 last:rounded-b-2xl hover:bg-white/10">
      <Link
        href={`/${props.username}`}
        className="flex w-full items-center space-x-2 text-sm"
      >
        {/* <div className="rounded-full w-10 h-10 bg-slate-50"></div> */}
        <ProfileImages ImgUrl={props.image} className="h-10 w-10" />
        <div className="flex flex-col items-start justify-center whitespace-nowrap text-left text-sm">
          <span className="text-base font-bold hover:underline hover:decoration-1">
            {name(props.name, 17)}
          </span>
          <span className="text-sm font-thin text-white/70">
            @{props.username}
          </span>
        </div>
      </Link>
      <div className="">
        {
          // dont show follow button if the user is the current user
          props.currentUserId !== props.id && (
            <FollowButton
              currentUserId={props.currentUserId}
              userIdTofollow={props.id}
              isFollowing={props.isFollowingByCurrentUser}
            />
          )
        }
      </div>
    </div>
  );
}

export default ProfileCard;
