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

  return (
    <div className="relative flex h-full w-full items-center justify-center text-white">
      <div className="h-full w-full min-w-full max-w-screen-xl xs:w-fit xs:min-w-fit lg:min-w-0">
        <div className="relative flex h-full w-full flex-row">
          <LeftSideBar />
          <main className="h-full w-full xs:ml-20 lg:max-w-[992px] lg:pr-3 xl:ml-72">
            <div className="flex h-full w-full justify-center space-x-4">
              <div className="no-scrollbar h-full min-h-svh w-full max-w-screen-sm overflow-y-auto border-l-[0.5px] border-r-[0.5px] border-gray-600">
                <div className="w-full lg:w-[640px]">{children}</div>
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
