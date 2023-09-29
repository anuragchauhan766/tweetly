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
      <div className="w-full h-12 font-bold text-xl p-4 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        Home
      </div>
      <TweetComposer session={session} />

      <Timeline session={session} />
    </div>
  );
}

export default Home;
