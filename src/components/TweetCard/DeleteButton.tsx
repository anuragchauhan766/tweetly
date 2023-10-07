"use client";
import { deleteTweet } from "@/utils/deleteTweet";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
interface DeleteButtonProps {
  tweetId: string;
  show: boolean;
}
function DeleteButton(props: DeleteButtonProps) {
  const router = useRouter();

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <Popover.Button className="outline=none">
            <div className="relative group cursor-pointer outline-none border-none focus:outline-none">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full p-4 hover:bg-blue/20 -m-2"></div>

              <BsThreeDots className="group-hover:text-blue" />
            </div>
          </Popover.Button>
          {props.show && open && (
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute z-[100] top-1 -right-2 w-64 origin-top-right   rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none shadow-custom bg-black after:block">
                <Popover.Button
                  type="button"
                  onClick={() => {
                    deleteTweet(props.tweetId);
                    router.refresh();
                  }}
                  className="grid grid-cols-5 justify-items-start place-items-center hover:bg-custom-gray text-red-600
               group  w-full  rounded-lg p-3 text-base font-bold  peer/logout transition-all duration-200 "
                >
                  <div className="">
                    <RiDeleteBin6Line className="w-5 h-5 fill-red-600" />
                  </div>
                  <div className="col-span-4">
                    <span>Delete</span>
                  </div>
                </Popover.Button>
              </Popover.Panel>
            </Transition>
          )}
        </>
      )}
    </Popover>
  );
}

export default DeleteButton;
