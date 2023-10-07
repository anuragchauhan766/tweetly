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

function TweetComposerDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
                      <span>Tweet</span>
                    </div>
                  </div>
                  <div className="h-full ">
                    <TweetComposer
                      session={session}
                      id="Tweetcomposer-dialog-file-input"
                    />
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
export default TweetComposerDialog;
