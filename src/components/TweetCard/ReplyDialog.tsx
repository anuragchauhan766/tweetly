"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import { TweetCardProps } from "@/types/Tweet";
import { BsDot } from "react-icons/bs";
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
