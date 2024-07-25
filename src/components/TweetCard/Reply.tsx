"use client";

import { useState } from "react";
import { BsChat } from "react-icons/bs";
import ReplyDialog from "./ReplyDialog";
import { TweetCardProps } from "@/types/Tweet";

function Reply(props: TweetCardProps) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group/chat z-[10] flex cursor-pointer items-center justify-center space-x-2 transition duration-200"
      >
        <div className="rounded-full p-3 group-hover/chat:bg-blue/20">
          <BsChat className="group-hover/chat:text-blue" />
        </div>
        <span className="text-sm group-hover/chat:text-blue">
          {props._count.replies}
        </span>
      </button>
      <ReplyDialog isOpen={isOpen} setIsOpen={setIsOpen} props={props} />
    </>
  );
}

export default Reply;
