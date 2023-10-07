"use client";
import Image from "next/image";

function ProfileImages({
  ImgUrl,
  ImgSize,
  className,
}: {
  ImgUrl: string | null | undefined;
  ImgSize?: string;
  className?: string;
}) {
  const newUrl =
    ImgUrl?.replace("96", ImgSize ?? "96") ?? "/default-profile.png";

  return (
    <div
      className={`relative rounded-full  bg-transparent self-start flex-none border-2 border-black  ${className}`}
    >
      <Image
        src={newUrl}
        alt="user profile image"
        fill={true}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 200px"
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
