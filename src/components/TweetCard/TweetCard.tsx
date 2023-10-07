"use client";
import React from "react";
import { FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import moment from "moment";
import ProfileImages from "../common/ProfileImages";
import LikeButton from "./LikeButton";
import type { TweetCardProps } from "@/types/Tweet";
import Reply from "./Reply";
import Link from "next/link";
import { formatTimeRelative } from "@/helper/formatDate";
import DeleteButton from "./DeleteButton";
import Image from "next/image";

function TweetCard(props: TweetCardProps) {
  const { isOnTweetPage, isParentTweetwithReply } = props;

  return (
    <div
      className={`relative w-full ${
        isParentTweetwithReply !== true ? "border-b-[0.5px]" : ""
      } border-gray-600`}
    >
      {isOnTweetPage !== true ? (
        <Link
          href={`/${props.auther.username}/tweet/${props.id}`}
          className="absolute top-0 left-0  w-full h-full z-[4]"
          scroll={false}
        >
          <span className="hidden"></span>
        </Link>
      ) : null}

      <div className="w-full flex space-x-2 items-start p-2 ">
        {isOnTweetPage !== true ? (
          <Link href={`/${props.auther.username as string}`} className="z-[10]">
            <ProfileImages
              ImgUrl={props.auther.image}
              className="w-10 h-10 xs:w-12 xs:h-12"
            />
          </Link>
        ) : null}
        {isParentTweetwithReply === true ? (
          <div className="w-0.5 flex-1 bg-white/20   absolute top-4 left-6 h-full z-[-1]"></div>
        ) : null}

        <div className="w-full flex flex-col px-1 ">
          <div className="flex items-center justify-between mb-2">
            <div className="flex w-full  items-center justify-start gap-1 z-[10]">
              {isOnTweetPage === true ? (
                <Link
                  href={`/${props.auther.username as string}`}
                  className="mr-2"
                >
                  <ProfileImages
                    ImgUrl={props.auther.image}
                    className="w-12 h-12"
                  />
                </Link>
              ) : null}

              <Link
                href={`/${props.auther.username as string}`}
                className={`flex items-start justify-center flex-col xs:flex-row gap-0 xs:gap-2 ${
                  isOnTweetPage === true ? "flex-col gap-0" : ""
                }`}
              >
                <div>
                  <span className="font-bold hover:underline decoration-1 ">
                    {props.auther.name}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <span className="font-thin text-gray-500 text-base">
                    @{props.auther.username}
                  </span>
                  {isOnTweetPage !== true ? (
                    <div className="space-x-1">
                      {/* <BsDot className="text-gray-500" /> */}
                      <span className="text-gray-500 ">·</span>
                      <span className="font-thin text-gray-500 hover:underline">
                        {/* to be upgraded to absolute after a day */}
                        {formatTimeRelative(props.createdAt)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </Link>
            </div>
            <div className="z-10">
              <DeleteButton
                tweetId={props.id}
                show={props.autherId === props.currentUserId}
              />
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className=" w-full ">
              <p className="whitespace-pre-wrap">{props.content}</p>
            </div>
            {props.media && (
              <div className="relative w-full aspect-auto rounded-2xl mb-2">
                <Image
                  src={props.media}
                  alt="tweet_post"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="rounded-2xl w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
          {isOnTweetPage === true ? (
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
              isOnTweetPage === true ? "justify-around" : "justify-between "
            }`}
          >
            <Reply {...props} />
            <div className="flex items-center justify-center space-x-2 group/retweet cursor-pointer z-[9]">
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
              pageNumber={props.pageNumber}
            />

            <div className="flex items-center justify-center space-x-2 group/share cursor-pointer z-[9]">
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
