import Image from "next/image";
import React from "react";
interface CardProps {
  title: string;
  image: string;
}
function TrendingCard(props: CardProps) {
  return (
    <div className="w-full hover:bg-white/10 px-2 py-1 last:rounded-b-2xl transition duration-200 cursor-pointer flex items-center justify-between gap-2">
      <div className="w-[calc(100%_-_7rem)]">
        <div className="font-bold text-sm">{props.title}</div>
        <div className="text-sm text-gray-400">Times of India</div>
      </div>
      <div className="relative w-28">
        <Image
          src={props.image}
          width={1280}
          height={720}
          alt={props.title}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}

export default TrendingCard;
