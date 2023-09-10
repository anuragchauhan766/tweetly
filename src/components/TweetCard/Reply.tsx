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
        className="flex items-center justify-center space-x-2 group/chat cursor-pointer transition duration-200 z-[10]"
      >
        <div className="p-3 rounded-full group-hover/chat:bg-blue/20">
          <BsChat className="group-hover/chat:text-blue" />
        </div>
        <span className="group-hover/chat:text-blue text-sm">
          {props._count.replies}
        </span>
      </button>
      <ReplyDialog isOpen={isOpen} setIsOpen={setIsOpen} props={props} />
    </>
  );
}

export default Reply;
