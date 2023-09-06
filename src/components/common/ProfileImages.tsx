"use client";
import Image from "next/image";
import { CSSProperties } from "react";

function ProfileImages({
  ImgUrl,
  className,
}: {
  ImgUrl: string | null | undefined;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-full w-12 h-12 bg-transparent self-start flex-none border-2 border-black  ${className}`}
    >
      <Image
        src={ImgUrl ?? "/default-profile.png"}
        alt="user profile image"
        fill={true}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 120px"
        style={{
          overflow: "hidden",
        }}
        priority={true}
        className={`rounded-full `}
      ></Image>
    </div>
  );
}

export default ProfileImages;
