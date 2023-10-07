"use client";
import React, { useState } from "react";
import { GiFeather } from "react-icons/gi";
import TweetComposerDialog from "../TweetComposerDialog";

function ComposeTweet(props: { ClassName?: string }) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-fit lg:w-full  grid place-items-center rounded-full p-3  xl:px-8 xl:py-2 text-xl bg-blue xl:mx-2 hover:bg-opacity-80 font-bold"
      >
        <span className="hidden xl:inline">Post</span>
        <GiFeather className={`xl:hidden  ${props.ClassName}`} />
      </button>
      <TweetComposerDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ComposeTweet;
