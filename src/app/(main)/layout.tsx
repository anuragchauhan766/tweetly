import LeftSideBar from "@/components/LeftSidebar/LeftSideBar";
import GoToTopButton from "@/components/common/button/GoToTopButton";
import RightSideBar from "@/components/rightSideBar/RightSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative text-white ">
      <div className=" max-w-screen-xl w-full h-full relative flex flex-row">
        <LeftSideBar />
        <main className="ml-72 h-full w-full">
          <div className="w-full flex  justify-center space-x-4">
            <div className="max-w-screen-sm w-full  border-r-[0.5px] border-l-[0.5px] border-gray-600 ">
              {children}
            </div>
            <RightSideBar />
          </div>
        </main>
        <GoToTopButton />
      </div>
    </div>
  );
}
