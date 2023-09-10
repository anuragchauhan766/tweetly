import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import moment from "moment";
import ProfileImages from "../common/ProfileImages";
import LikeButton from "./LikeButton";
import type { TweetCardProps } from "@/types/Tweet";
import Reply from "./Reply";
import Link from "next/link";
import { formatTimeRelative } from "@/helper/formatDate";

function TweetCard(props: TweetCardProps) {
  const { main } = props;

  return (
    <div className="relative w-full border-b-[0.5px] border-gray-600">
      {main !== true ? (
        <Link
          href={`/${props.auther.username}/tweet/${props.id}`}
          className="absolute top-0 left-0  w-full h-full z-[4]"
        >
          <span className="hidden"></span>
        </Link>
      ) : null}

      <div className="w-full flex space-x-2 items-start p-2 ">
        {main !== true ? (
          <Link href={`/${props.auther.username as string}`} className="z-[10]">
            <ProfileImages ImgUrl={props.auther.image} />
          </Link>
        ) : null}

        <div className="w-full flex flex-col px-1 ">
          <div className="flex items-center justify-between mb-2">
            <div className="flex w-full  items-center justify-start gap-1 z-[10]">
              {main === true ? (
                <Link
                  href={`/${props.auther.username as string}`}
                  className="mr-2"
                >
                  <ProfileImages ImgUrl={props.auther.image} />
                </Link>
              ) : null}

              <Link
                href={`/${props.auther.username as string}`}
                className={`flex items-start justify-center  ${
                  main === true ? "flex-col gap-0" : "gap-2"
                }`}
              >
                <div>
                  <span className="font-bold hover:underline decoration-1">
                    {props.auther.name}
                  </span>
                </div>
                <div>
                  <span className="font-thin text-gray-500 text-base">
                    @{props.auther.username}
                  </span>
                </div>
              </Link>
              {main !== true ? (
                <>
                  {/* <BsDot className="text-gray-500" /> */}
                  <span className="text-gray-500 ">·</span>
                  <span className="font-thin text-gray-500 hover:underline">
                    {/* to be upgraded to absolute after a day */}
                    {formatTimeRelative(props.createdAt)}
                  </span>
                </>
              ) : null}
            </div>
            <div>
              <div className="relative group cursor-pointer">
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full p-4 hover:bg-blue/20 -m-2"></div>
                <BsThreeDots className="group-hover:text-blue" />
              </div>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className=" w-full ">
              <p className="whitespace-pre-wrap">{props.content}</p>
            </div>
            {/* <div className="w-full aspect-square rounded-2xl bg-slate-50 "></div> */}
          </div>
          {main === true ? (
            <div className="text-gray-400 font-light text-base border-b-[0.5px] border-gray-600">
              <div className="my-3">
                <span className="hover:underline decoration-1 cursor-pointer ">
                  {moment(props.createdAt).format("h:mm A · MMM D,YYYY")}
                </span>
              </div>
            </div>
          ) : null}

          <div
            className={`flex  items-center w-full h-10 text-white/60 mt-1  ${
              main === true ? "justify-around" : "justify-between "
            }`}
          >
            <Reply {...props} />
            <div className="flex items-center justify-center space-x-2 group/retweet cursor-pointer z-[10]">
              <div className="p-3 rounded-full group-hover/retweet:bg-green/20">
                <FaRetweet className="group-hover/retweet:text-green text-lg" />
              </div>
              <span className="group-hover/retweet:text-green text-sm">4</span>
            </div>

            <LikeButton
              userId={props.currentUserId}
              tweetId={props.id}
              LikeCount={props._count.likes}
              isLikedByCurrentUser={props.isLikedByCurrentUser}
            />

            <div className="flex items-center justify-center space-x-2 group/share cursor-pointer z-[10]">
              <div className="p-3 rounded-full group-hover/share:bg-blue/20">
                <FiShare className="group-hover/share:text-blue text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
