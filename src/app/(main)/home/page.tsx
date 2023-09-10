import TweetCard from "@/components/TweetCard/TweetCard";
import TweetComposer from "@/components/common/TweetComposer";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import type { TweetCardProps } from "@/types/Tweet";

import { getUserTweets } from "@/utils/getUserTweets";

import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();

  const Tweets = await getUserTweets(session.user.id);

  return (
    <div className=" w-full">
      <div className="w-full h-12 font-bold text-xl p-4 flex items-center justify-start backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        Home
      </div>
      <TweetComposer />
      {Tweets.map((tweet) => {
        const tweetCardProps: TweetCardProps = {
          ...tweet,
          currentUserId: session.user.id,
        };

        return <TweetCard key={tweet.id} {...tweetCardProps} />;
      })}
    </div>
  );
}

export default Home;
