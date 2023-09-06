"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Message() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center text-white mt-10">
      <div className="flex flex-col items-center justify-center gap-3 my-10 p-4">
        <div className="flex gap-2 items-center justify-center">
          <code className="text-3xl font-bold">&quot;{pathname}&quot;</code>
          <span className="text-3xl font-bold">Under Developement</span>
        </div>
        <span className="text-xl font-bold ">Visit Other Parts of App</span>
      </div>
    </div>
  );
}

export default Message;
