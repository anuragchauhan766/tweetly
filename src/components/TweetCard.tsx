import React from "react";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { FiShare } from "react-icons/fi";

function TweetCard({ key }: { key: number }) {
  return (
    <div className="w-full border-b-[0.5px] border-gray-600" key={key}>
      <div className="w-full flex space-x-2 items-start p-2">
        <div className="w-10 h-10 rounded-full bg-slate-50"></div>

        <div className="w-full flex flex-col px-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex w-full space-x-1 items-center justify-start ">
              <span className="font-bold ">Anurag singh chauhan</span>
              <span className="font-thin text-gray-500">@anuragsingh</span>

              <BsDot className="text-gray-500" />

              <span className="font-thin text-gray-500 hover:underline">
                Aug 10
              </span>
            </div>
            <div className="rounded-full p-2 hover:bg-blue/20 group cursor-pointer">
              <BsThreeDots className="group-hover:text-blue" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className=" w-full ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              placeat molestias, eveniet, illo laboriosam odit suscipit aperiam
              eum quam mollitia neque! Aspernatur veritatis earum consequuntur
              commodi, quae quis delectus nesciunt, omnis laborum labore
              asperiores reprehenderit dignissimos illum odio magni doloribus
              nam est culpa doloremque tempora, iure nemo iste iusto atque?
              Quibusdam tenetur, exercitationem officiis nulla alias quis, illo
              suscipit,
            </div>
            <div className="w-full aspect-square rounded-2xl bg-slate-50 "></div>
          </div>
          <div className="flex justify-between items-center w-full h-10 text-white/60">
            <div className="flex items-center justify-center space-x-2 group/chat cursor-pointer transition duration-200">
              <div className="p-3 rounded-full group-hover/chat:bg-blue/20">
                <BsChat className="group-hover/chat:text-blue" />
              </div>
              <span className="group-hover/chat:text-blue text-sm">4</span>
            </div>
            <div className="flex items-center justify-center space-x-2 group/retweet cursor-pointer">
              <div className="p-3 rounded-full group-hover/retweet:bg-green/20">
                <FaRetweet className="group-hover/retweet:text-green text-lg" />
              </div>
              <span className="group-hover/retweet:text-green text-sm">4</span>
            </div>
            <div className="flex items-center justify-center space-x-2 group/like cursor-pointer">
              <div className="p-3 rounded-full group-hover/like:bg-pink/20">
                <AiOutlineHeart className="group-hover/like:text-pink text-lg" />
              </div>
              <span className="group-hover/like:text-pink text-sm">4</span>
            </div>
            <div className="flex items-center justify-center space-x-2 group/stats cursor-pointer">
              <div className="p-3 rounded-full group-hover/stats:bg-blue/20">
                <IoIosStats className="group-hover/stats:text-blue text-lg" />
              </div>
              <span className="group-hover/stats:text-blue text-sm">4</span>
            </div>
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
