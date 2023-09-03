"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProfileImages from "../ProfileImages";
import moment from "moment";
import { TweetCardProps } from "@/types/Tweet";
import { BsDot } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { submitTweet } from "@/utils/submitTweet";
import { AuthRequiredError } from "@/lib/exception";
import autoheight from "@/helper/autoheight";
import SubmitButton from "../SubmitButton";

function ReplyDialog({
  isOpen,
  setIsOpen,
  props,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  props: TweetCardProps;
}) {
  const { data: session, status } = useSession();
  const Formref = useRef<null | HTMLFormElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  if (status === "loading") {
    // to be improve
    return <div>Loading</div>;
  }
  if (status !== "authenticated") throw new AuthRequiredError();
  async function action(data: FormData) {
    const res = await submitTweet(data, {
      isReply: true,
      parentTweetId: props.id,
    });
    if (res?.error) {
      console.log(res.error);
    }
    Formref.current?.reset();
    if (textareaRef.current) textareaRef.current.style.height = "56px";
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 "
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-light-gray " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto   h-screen">
          <div className="flex  justify-center items-start p-10 text-center   h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Dialog box  */}
              <Dialog.Panel
                className="w-full max-w-screen-sm max-h-[90vh]  h-fit transform overflow-hidden rounded-2xl bg-black pl-2 text-left align-middle shadow-xl transition-all flex flex-col gap-3"
                as="div"
              >
                <div className="overflow-auto">
                  {/* Close button */}
                  <div className=" flex items-center sticky top-0 backdrop-blur-sm bg-black/50 z-[10] p-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-full hover:bg-white/10 p-3"
                    >
                      <AiOutlineClose className=" fill-white w-6 h-6" />
                    </button>
                    <div className="flex-1"></div>
                  </div>
                  {/* main content of reply */}
                  <div>
                    <div className=" flex flex-col  flex-1 text-white relative">
                      <div className="w-full flex space-x-2 items-start p-2  ">
                        <div className="flex flex-col flex-1 w-12   basis-10 ">
                          <ProfileImages ImgUrl={props.auther.image} />

                          {/* relation div */}
                          <div className="w-0.5 flex-1 bg-white/20   absolute top-4 left-8 h-full z-[-1]"></div>
                        </div>

                        <div className="w-full flex flex-col px-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex w-full space-x-1 items-center justify-start ">
                              <span className="font-bold ">
                                {props.auther.name}
                              </span>
                              <span className="font-thin text-gray-500">
                                @{props.auther.username}
                              </span>

                              <BsDot className="text-gray-500" />

                              <span className="font-thin text-gray-500 hover:underline">
                                {/* to be upgraded to absolute after a day */}
                                {moment(props.createdAt).fromNow()}
                              </span>
                            </div>
                          </div>
                          <div className="w-full space-y-2">
                            <p className="whitespace-pre-wrap">
                              {props.content}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex p-2">
                        <div className="w-12 flex items-center justify-center flex-col">
                          {/* <div className="w-[2px] flex-auto bg-white/20  "></div> */}
                        </div>
                        <div className="text-gray-500 px-2 mx-2 text-base">
                          Replying to{" "}
                          <span className="font-thin text-blue">
                            @{props.auther.username}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* reply box */}
                    <div>
                      <div className="w-full  h-fit   p-2 flex items-center pt-4 space-x-2">
                        <ProfileImages ImgUrl={session.user.image} />
                        <form
                          className="w-full h-fit  flex flex-col justify-start items-center"
                          action={action}
                          ref={Formref}
                        >
                          <div className="w-full  h-fit ">
                            <textarea
                              ref={textareaRef}
                              className="bg-transparent appearance-none outline-none w-full h-auto resize-none   text-xl text-white/70 overflow-hidden px-2 pt-2"
                              placeholder="Post Your Reply"
                              name="tweetText"
                              onChange={(e) => {
                                autoheight(e, "56px");
                              }}
                              rows={2}
                            ></textarea>
                          </div>
                          <div className="w-full h-16 flex items-center justify-end sticky bottom-0">
                            {/* <div></div> */}
                            <div className="w-full max-w-[100px] text-white">
                              <SubmitButton />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default ReplyDialog;
