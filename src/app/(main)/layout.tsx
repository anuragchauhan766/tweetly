import LeftSideBar from "@/components/LeftSidebar/LeftSideBar";
import GoToTopButton from "@/components/common/button/GoToTopButton";
import MobileBar from "@/components/mobileBar/MobileBar";
import RightSideBar from "@/components/rightSideBar/RightSideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return (
    <div className="w-full h-full flex items-center justify-center relative text-white ">
      <div className=" max-w-screen-xl h-full w-full xs:w-fit min-w-full xs:min-w-fit lg:min-w-0 ">
        <div className="  w-full h-full relative flex flex-row ">
          <LeftSideBar />
          <main className="xs:ml-20 xl:ml-72 h-full  w-full lg:max-w-[992px] lg:pr-3">
            <div className="w-full flex  justify-center space-x-4 h-full">
              <div className="max-w-screen-sm w-full  border-r-[0.5px] border-l-[0.5px] border-gray-600 overflow-y-auto h-full no-scrollbar">
                <div className="w-full lg:w-[640px]  ">{children}</div>
              </div>
              <RightSideBar />
            </div>
          </main>
          <MobileBar session={session} />
          <GoToTopButton />
        </div>
      </div>
    </div>
  );
}
