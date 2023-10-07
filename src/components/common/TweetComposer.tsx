"use client";
import autoheight from "@/helper/autoheight";
import { submitTweet } from "@/utils/submitTweet";
import ProfileImages from "./ProfileImages";
import SubmitButton from "./button/SubmitButton";
import { useRef, useState } from "react";
import { Session } from "next-auth";
import { HiOutlinePhoto } from "react-icons/hi2";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
type propsType =
  | {
      session: Session;
      id: string;
      replybox?: false;
      parentTweetId?: never;
    }
  | {
      session: Session;
      id: string;
      replybox: true;
      parentTweetId: string;
    };

function TweetComposer(props: propsType) {
  const [input, setInput] = useState("");
  const [imagesrc, setImagesrc] = useState<string | null>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const [inputFile, setInputFile] = useState("");

  async function action(data: FormData) {
    const res = await (props.replybox
      ? submitTweet(data, {
          isReply: true,
          parentTweetId: props.parentTweetId,
        })
      : submitTweet(data));

    if (res?.error) {
      console.log(res.error);
    }

    setInput("");
    setImagesrc(null);
    setInputFile("");
    if (textareaRef.current) textareaRef.current.style.height = "56px";
  }
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setInputFile(e.target.value);
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImagesrc(url);
    }
  };
  return (
    <div
      className={`w-full  h-fit flex items-center pt-4 space-x-2 ${
        props.replybox ? "p-2 flex" : " border-b-[0.5px] border-gray-600 px-4"
      }`}
    >
      <ProfileImages
        ImgUrl={props.session.user.image}
        className="w-10 h-10 xs:w-12 xs:h-12"
      />
      <form
        className="w-full h-fit  flex flex-col justify-start items-center"
        action={action}
      >
        <div
          className={`w-full  h-fit ${
            props.replybox
              ? ""
              : "focus-within:border-b-[0.5px] focus:border-gray-600"
          }`}
        >
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
          ></textarea>
          {imagesrc && (
            <div className="relative w-full aspect-auto rounded-2xl mb-2">
              <Image
                src={imagesrc}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-2xl w-full h-auto object-contain"
              />
              <button
                onClick={() => {
                  setInputFile("");
                  setImagesrc(null);
                }}
                className="absolute p-3 rounded-full bg-black/50 hover:bg-black/30 text-white right-2 top-3"
              >
                <AiOutlineClose className=" fill-white w-6 h-6" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div className="p-2 rounded-full hover:bg-blue/20">
            <label htmlFor={props.id} className="cursor-pointer">
              <HiOutlinePhoto className="text-blue w-6 h-6" />
            </label>
            <input
              type="file"
              value={inputFile}
              accept="image/*"
              id={props.id}
              name="image"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="w-full max-w-[100px] text-white">
            <SubmitButton disabled={!(input.trim() || imagesrc)}>
              Post
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TweetComposer;
