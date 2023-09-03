"use client";
import autoheight from "@/helper/autoheight";
import { submitTweet } from "@/utils/submitTweet";
import ProfileImages from "./ui/ProfileImages";
import SubmitButton from "./ui/SubmitButton";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { AuthRequiredError } from "@/lib/exception";

function TweetComposer() {
  const { data: session, status } = useSession();
  const Formref = useRef<null | HTMLFormElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  if (status === "loading") {
    // to be improve
    return <div>Loading</div>;
  }
  if (status !== "authenticated") throw new AuthRequiredError();
  async function action(data: FormData) {
    const res = await submitTweet(data);
    if (res?.error) {
      console.log(res.error);
    }
    Formref.current?.reset();
    if (textareaRef.current) textareaRef.current.style.height = "56px";
  }
  return (
    <div className="w-full  h-fit border-t-[0.5px] border-b-[0.5px] border-gray-600 px-4 flex items-center pt-4 space-x-2">
      <ProfileImages ImgUrl={session.user.image as string} />
      <form
        className="w-full h-fit  flex flex-col justify-start items-center"
        action={action}
        ref={Formref}
      >
        <div className="w-full  h-fit focus-within:border-b-[0.5px] focus:border-gray-600">
          <textarea
            ref={textareaRef}
            className="bg-transparent appearance-none outline-none w-full h-auto resize-none   text-xl text-white/70 overflow-hidden px-2 pt-2"
            placeholder="What is happening?!"
            name="tweetText"
            onChange={(e) => {
              autoheight(e, "56px");
            }}
            rows={2}
            // onKeyDown={handleTextareaKeyDown}
          ></textarea>
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div></div>
          <div className="w-full max-w-[100px]">
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TweetComposer;
