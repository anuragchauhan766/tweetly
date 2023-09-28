"use client";
import autoheight from "@/helper/autoheight";
import { submitTweet } from "@/utils/submitTweet";
import ProfileImages from "./ProfileImages";
import SubmitButton from "./button/SubmitButton";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "@/lib/exception";
import { Session } from "next-auth";

function TweetComposer(props: { session: Session }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  async function action(data: FormData) {
    const res = await submitTweet(data);
    if (res?.error) {
      console.log(res.error);
    }
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "56px";
  }
  return (
    <div className="w-full  h-fit border-t-[0.5px] border-b-[0.5px] border-gray-600 px-4 flex items-center pt-4 space-x-2">
      <ProfileImages ImgUrl={props.session.user.image} />
      <form
        className="w-full h-fit  flex flex-col justify-start items-center"
        action={action}
      >
        <div className="w-full  h-fit focus-within:border-b-[0.5px] focus:border-gray-600">
          <textarea
            ref={textareaRef}
            className="bg-transparent appearance-none outline-none w-full h-auto resize-none   text-xl text-white/70 overflow-hidden p-2 pb-0 box-border"
            placeholder="What is happening?!"
            name="tweetText"
            onChange={(e) => {
              autoheight(e, "56px", 8);
              setInput(e.target.value);
            }}
            value={input}

            // onKeyDown={handleTextareaKeyDown}
          ></textarea>
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div></div>
          <div className="w-full max-w-[100px]">
            <SubmitButton disabled={!input.trim()}>Post</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TweetComposer;
