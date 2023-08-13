"use client";
import autoheight from "@/helper/autoheight";

function TweetComposer() {
  return (
    <div className="w-full min-h-40 h-fit border-t-[0.5px] border-b-[0.5px] border-gray-600 px-4 flex items-center pt-4 space-x-2">
      <div className="h-10 w-10 rounded-full bg-slate-50 self-start p-2"></div>
      <div className="w-full h-fit  flex flex-col justify-start items-center ">
        <div className="w-full min-h-32 h-fit focus-within:border-b-[0.5px] focus:border-gray-600">
          <textarea
            className="bg-transparent appearance-none outline-none w-full h-auto resize-none   text-xl text-white/70 overflow-hidden px-2"
            placeholder="What is happening?!"
            onChange={(e) => autoheight(e, "80px")}
            rows={2}
          ></textarea>
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div></div>
          <div className="w-full max-w-[100px]">
            <button className="w-full rounded-3xl px-4 py-2 text-lg bg-blue  hover:bg-opacity-90 font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetComposer;
