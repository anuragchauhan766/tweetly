import UserProfile from "@/components/LeftSidebar/UserProfile";
import ProfileImages from "@/components/common/ProfileImages";
import TweetComposer from "@/components/common/TweetComposer";
import Timeline from "@/components/home/Timeline";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";

import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();

  return (
    <div className=" w-full">
      <div className="w-full h-12 font-bold text-xl p-2 xs:p-4 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 z-50 gap-3">
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
      <div className="mt-2 xs:mt-0 mb-10">
        <Timeline session={session} />
      </div>
    </div>
  );
}

export default Home;
