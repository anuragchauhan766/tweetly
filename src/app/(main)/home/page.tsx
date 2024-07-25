// import ProfileImages from "@/components/common/ProfileImages";
import TweetComposer from "@/components/common/TweetComposer";
import Timeline from "@/components/home/Timeline";
import UserProfile from "@/components/LeftSidebar/UserProfile";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 flex h-12 w-full items-center justify-start gap-3 bg-black/50 p-2 text-xl font-bold backdrop-blur-sm xs:p-4">
        <div className="xs:hidden">
          <UserProfile />
        </div>
        <div>
          <span className="text-base">Home</span>
        </div>
      </div>
      <div className="hidden xs:block">
        <TweetComposer session={session} id="main_input_file_composer" />
      </div>
      <div className="mb-10 mt-2 xs:mt-0">
        <Timeline session={session} />
      </div>
    </div>
  );
}

export default Home;
