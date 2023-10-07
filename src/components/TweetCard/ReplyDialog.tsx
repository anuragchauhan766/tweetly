"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { TweetCardProps } from "@/types/Tweet";
import { BsDot } from "react-icons/bs";
import { useSession } from "next-auth/react";
import ProfileImages from "../common/ProfileImages";
import TweetComposer from "../common/TweetComposer";
import { formatTimeRelative } from "@/helper/formatDate";

function ReplyDialog({
  isOpen,
  setIsOpen,
  props,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  props: TweetCardProps;
}) {
  const { data: session, status } = useSession({
    required: true,
  });
  if (status === "loading") return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] "
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

        <div className="fixed inset-0 overflow-y-auto w-full  h-screen">
          <div className="flex  justify-center items-start xs:p-10 text-center   h-full">
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
                className="w-full max-w-screen-sm h-full xs:max-h-[90vh]  xs:h-fit transform overflow-hidden xs:rounded-2xl bg-black pl-2 text-left align-middle shadow-xl transition-all flex flex-col gap-3"
                as="div"
              >
                <div className="overflow-auto h-full">
                  {/* Close button */}
                  <div className=" flex items-center sticky top-0 backdrop-blur-sm bg-black/50 z-[10] p-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-full hover:bg-white/10 p-3"
                    >
                      <AiOutlineClose className=" fill-white w-6 h-6" />
                    </button>
                    <div className="flex-1 text-white ml-2">
                      <span>Reply</span>
                    </div>
                  </div>
                  {/* main content of reply */}
                  <div className="h-full">
                    <div className=" flex flex-col  flex-1 text-white relative">
                      <div className="w-full flex space-x-2 items-start p-2  ">
                        <div className="flex flex-col flex-1 w-12   basis-10 ">
                          <ProfileImages
                            ImgUrl={props.auther.image}
                            className="w-10 h-10 xs:w-12 xs:h-12"
                          />

                          {/* relation div */}
                          <div className="w-0.5 flex-1 bg-white/20   absolute top-4 left-7 xs:left-8 h-full z-[-1]"></div>
                        </div>

                        <div className="w-full flex flex-col px-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start justify-center flex-col  xs:flex-row gap-0 xs:gap-2">
                              <div>
                                <span className="font-bold hover:underline decoration-1 ">
                                  {props.auther.name}
                                </span>
                              </div>
                              <div className="flex items-center justify-center space-x-1">
                                <span className="font-thin text-gray-500 text-base">
                                  @{props.auther.username}
                                </span>

                                <div className="space-x-1">
                                  <span className="text-gray-500 ">·</span>
                                  <span className="font-thin text-gray-500 hover:underline">
                                    {formatTimeRelative(props.createdAt)}
                                  </span>
                                </div>
                              </div>
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
                    <div className="h-full">
                      <TweetComposer
                        session={session}
                        key="reply-box"
                        replybox={true}
                        id="repy-box-file-input-composer"
                        parentTweetId={props.id}
                      />
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
