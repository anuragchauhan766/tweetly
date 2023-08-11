import LeftSideBar from "@/components/LeftSideBar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center relative text-white">
      <div className=" max-w-screen-xl w-full h-full relative flex flex-row">
        <LeftSideBar />
        <main className="ml-72 h-full w-full">
          <div className="w-full flex items-center justify-center space-x-2">
            <Main />
            <div className="w-[calc(100%-640px)] h-full bg-white/30">
              helloM
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
