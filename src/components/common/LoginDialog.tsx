"use client";
import Login from "@/app/(auth)/_component/Login";
import { useLoginDialog } from "@/context/LoginDialogContext";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

import { AiOutlineClose } from "react-icons/ai";

export default function LoginDialog() {
  const { isLoginDialogVisible, setIsLoginDialogVisible } = useLoginDialog();
  return (
    <Transition appear show={isLoginDialogVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setIsLoginDialogVisible(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-light-gray" />
        </TransitionChild>

        <div className="fixed inset-0 h-screen w-full overflow-y-auto">
          <div className="flex h-full items-center justify-center text-center xs:p-10">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* Dialog box  */}
              <DialogPanel
                className="flex h-full w-full max-w-sm transform flex-col gap-3 overflow-hidden bg-black pl-2 text-left align-middle text-white shadow-xl transition-all xs:h-fit xs:max-h-[90vh] xs:rounded-2xl"
                as="div"
              >
                <div className="flex h-full flex-col gap-7 overflow-auto py-6">
                  {/* Close button */}
                  <div className="sticky top-0 z-[10] flex items-center bg-black/50 p-2 backdrop-blur-sm">
                    <button
                      onClick={() => setIsLoginDialogVisible(false)}
                      className="flex items-center justify-center rounded-full p-3 hover:bg-white/10"
                    >
                      <AiOutlineClose className="h-6 w-6 fill-white" />
                    </button>
                  </div>
                  <DialogTitle className="w-full px-6 text-center text-xl font-bold md:text-4xl">
                    Sign In Now!
                  </DialogTitle>
                  <Description className="px-6 text-center text-sm">
                    To access User specific feature like posting, profile view
                    you have to Signup.
                  </Description>
                  <div className="px-6">
                    <Login />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
