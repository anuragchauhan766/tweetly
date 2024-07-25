"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { formatTimeRelative } from "@/helper/formatDate";
import { TweetCardProps } from "@/types/Tweet";
import { useSession } from "next-auth/react";
import ProfileImages from "../common/ProfileImages";
import TweetComposer from "../common/TweetComposer";

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
  if (status === "loading") return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
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
          <div className="fixed inset-0 bg-light-gray" />
        </Transition.Child>

        <div className="fixed inset-0 h-screen w-full overflow-y-auto">
          <div className="flex h-full items-start justify-center text-center xs:p-10">
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
                className="flex h-full w-full max-w-screen-sm transform flex-col gap-3 overflow-hidden bg-black pl-2 text-left align-middle shadow-xl transition-all xs:h-fit xs:max-h-[90vh] xs:rounded-2xl"
                as="div"
              >
                <div className="h-full overflow-auto">
                  {/* Close button */}
                  <div className="sticky top-0 z-[10] flex items-center bg-black/50 p-2 backdrop-blur-sm">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-full p-3 hover:bg-white/10"
                    >
                      <AiOutlineClose className="h-6 w-6 fill-white" />
                    </button>
                    <div className="ml-2 flex-1 text-white">
                      <span>Reply</span>
                    </div>
                  </div>
                  {/* main content of reply */}
                  <div className="h-full">
                    <div className="relative flex flex-1 flex-col text-white">
                      <div className="flex w-full items-start space-x-2 p-2">
                        <div className="flex w-12 flex-1 basis-10 flex-col">
                          <ProfileImages
                            ImgUrl={props.auther.image}
                            className="h-10 w-10 xs:h-12 xs:w-12"
                          />

                          {/* relation div */}
                          <div className="absolute left-7 top-4 z-[-1] h-full w-0.5 flex-1 bg-white/20 xs:left-8"></div>
                        </div>

                        <div className="flex w-full flex-col space-y-2 px-2">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col items-start justify-center gap-0 xs:flex-row xs:gap-2">
                              <div>
                                <span className="font-bold decoration-1 hover:underline">
                                  {props.auther.name}
                                </span>
                              </div>
                              <div className="flex items-center justify-center space-x-1">
                                <span className="text-base font-thin text-gray-500">
                                  @{props.auther.username}
                                </span>

                                <div className="space-x-1">
                                  <span className="text-gray-500">·</span>
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
                        <div className="flex w-12 flex-col items-center justify-center">
                          {/* <div className="w-[2px] flex-auto bg-white/20  "></div> */}
                        </div>
                        <div className="mx-2 px-2 text-base text-gray-500">
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
