import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TrendingCard(props: News) {
  return (
    <Link
      href={props.link}
      className="w-full hover:bg-white/10 px-2 py-1 last:rounded-b-2xl transition duration-200 cursor-pointer flex items-center justify-between gap-2"
      target="_blank"
    >
      <div className="w-[calc(100%_-_7rem)]">
        <div className="font-bold text-sm">{props.title}</div>
        <div className="text-sm text-gray-400">Times of India</div>
      </div>
      <div className="relative w-28">
        <Image
          src={props.enclosure["@url"]}
          width={1280}
          height={720}
          alt={props.title}
          className="rounded-2xl"
        />
      </div>
    </Link>
  );
}

export default TrendingCard;
