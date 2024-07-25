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
import { useQueryClient } from "@tanstack/react-query";
import { useLoginDialog } from "@/context/LoginDialogContext";
type propsType =
  | {
      session: Session | null;
      id: string;
      replybox?: false;
      parentTweetId?: never;
    }
  | {
      session: Session | null;
      id: string;
      replybox: true;
      parentTweetId: string;
    };

function TweetComposer({ session, ...props }: propsType) {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const { setIsLoginDialogVisible } = useLoginDialog();
  const [imagesrc, setImagesrc] = useState<string | null>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const [inputFile, setInputFile] = useState("");

  async function action(data: FormData) {
    if (!session) {
      setIsLoginDialogVisible(true);
    }
    await (props.replybox
      ? submitTweet(data, {
          isReply: true,
          parentTweetId: props.parentTweetId,
        })
      : submitTweet(data));
    queryClient.invalidateQueries({
      queryKey: ["timeline", session?.user.id || "default User"],
    });

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
      className={`flex h-fit w-full items-center space-x-2 pt-4 ${
        props.replybox ? "flex p-2" : "border-b-[0.5px] border-gray-600 px-4"
      }`}
    >
      <ProfileImages
        ImgUrl={session?.user.image}
        className="h-10 w-10 xs:h-12 xs:w-12"
      />
      <form
        className="flex h-fit w-full flex-col items-center justify-start"
        action={action}
      >
        <div
          className={`h-fit w-full ${
            props.replybox
              ? ""
              : "focus-within:border-b-[0.5px] focus:border-gray-600"
          }`}
        >
          <textarea
            ref={textareaRef}
            className="box-border h-auto w-full resize-none appearance-none overflow-hidden bg-transparent p-2 pb-0 text-xl text-white/70 outline-none"
            placeholder="What is happening?!"
            name="tweetText"
            onChange={(e) => {
              autoheight(e, "56px", 8);
              setInput(e.target.value);
            }}
            value={input}
          ></textarea>
          {imagesrc && (
            <div className="relative mb-2 aspect-auto w-full rounded-2xl">
              <Image
                src={imagesrc}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full rounded-2xl object-contain"
              />
              <button
                onClick={() => {
                  setInputFile("");
                  setImagesrc(null);
                }}
                className="absolute right-2 top-3 rounded-full bg-black/50 p-3 text-white hover:bg-black/30"
              >
                <AiOutlineClose className="h-6 w-6 fill-white" />
              </button>
            </div>
          )}
        </div>
        <div className="flex h-16 w-full items-center justify-between">
          <div className="rounded-full p-2 hover:bg-blue/20">
            <label htmlFor={props.id} className="cursor-pointer">
              <HiOutlinePhoto className="h-6 w-6 text-blue" />
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
