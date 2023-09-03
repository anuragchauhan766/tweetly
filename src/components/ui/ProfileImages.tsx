"use client";
import Image from "next/image";
import { GoPersonFill } from "react-icons/go";

function ProfileImages({ ImgUrl }: { ImgUrl: string | null | undefined }) {
  return (
    <div className="rounded-full w-12 h-12 bg-transparent self-start flex-none">
      <Image
        src={ImgUrl ?? "/default-profile.png"}
        alt="user profile image"
        width={1000}
        height={1000}
        style={{
          width: "auto",
          overflow: "hidden",
        }}
        priority={true}
        className="rounded-full"
      ></Image>
    </div>
  );
}

export default ProfileImages;
