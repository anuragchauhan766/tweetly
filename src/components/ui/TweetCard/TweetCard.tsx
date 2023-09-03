import React from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import moment from "moment";
import ProfileImages from "../ProfileImages";
import LikeButton from "./LikeButton";
import type { TweetCardProps } from "@/types/Tweet";
import Reply from "./Reply";

function TweetCard(props: TweetCardProps) {
  return (
    <div className="w-full border-b-[0.5px] border-gray-600">
      <div className="w-full flex space-x-2 items-start p-2">
        <ProfileImages ImgUrl={props.auther.image} />

        <div className="w-full flex flex-col px-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex w-full space-x-1 items-center justify-start ">
              <span className="font-bold ">{props.auther.name}</span>
              <span className="font-thin text-gray-500">
                @{props.auther.username}
              </span>

              <BsDot className="text-gray-500" />

              <span className="font-thin text-gray-500 hover:underline">
                {/* to be upgraded to absolute after a day */}
                {moment(props.createdAt).fromNow()}
              </span>
            </div>
            <div className="rounded-full p-2 hover:bg-blue/20 group cursor-pointer">
              <BsThreeDots className="group-hover:text-blue" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className=" w-full ">
              <p className="whitespace-pre-wrap">{props.content}</p>
            </div>
            {/* <div className="w-full aspect-square rounded-2xl bg-slate-50 "></div> */}
          </div>
          <div className="flex justify-between items-center w-full h-10 text-white/60">
            <Reply {...props} />
            <div className="flex items-center justify-center space-x-2 group/retweet cursor-pointer">
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

            <div className="flex items-center justify-center space-x-2 group/share cursor-pointer">
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
