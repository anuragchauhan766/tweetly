"use client";
import React, { useState } from "react";
import { GiFeather } from "react-icons/gi";
import TweetComposerDialog from "../TweetComposerDialog";
import { useLoginDialog } from "@/context/LoginDialogContext";
import { Session } from "next-auth";

function ComposeTweet(props: { ClassName?: string; session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  const { setIsLoginDialogVisible } = useLoginDialog();
  const handleClick = () => {
    if (props.session) {
      setIsOpen(true);
    } else {
      setIsLoginDialogVisible(true);
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="grid w-fit place-items-center rounded-full bg-blue p-3 text-xl font-bold hover:bg-opacity-80 lg:w-full xl:mx-2 xl:px-8 xl:py-2"
      >
        <span className="hidden xl:inline">Post</span>
        <GiFeather className={`xl:hidden ${props.ClassName}`} />
      </button>
      <TweetComposerDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ComposeTweet;
