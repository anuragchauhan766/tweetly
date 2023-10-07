import React from "react";
import GoBackButton from "./button/GoBackButton";

function UnderService(props: { pathname: string }) {
  const { pathname } = props;
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="w-full  font-bold text-base xs:text-xl p-1 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 gap-6 ps-2 z-50">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold capitalize">{pathname.substring(1)}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 my-10 p-4">
        <div className="flex flex-col  gap-2 items-center justify-center">
          <code className="text-xl xs:text-3xl font-bold">
            &quot;{pathname}&quot;
          </code>
          <span className="text-xl xs:text-3xl font-bold">
            Under Developement
          </span>
        </div>
        <span className="text-base xs:text-xl font-bold ">
          Visit Other Parts of App
        </span>
      </div>
    </div>
  );
}

export default UnderService;
