import TweetCard from "@/components/TweetCard/TweetCard";
import GoBackButton from "@/components/common/button/GoBackButton";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getTweet } from "@/utils/getTweet";
import { getServerSession } from "next-auth";

async function TweetPage({ params }: { params: { tweetid: string } }) {
  const session = await getServerSession(authOptions);

  const tweet = await getTweet(params.tweetid, session?.user.id);
  if (!tweet) return null;
  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 flex w-full items-center justify-start gap-6 bg-black/50 p-1 ps-2 text-xl font-bold backdrop-blur-sm">
        <GoBackButton />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold">Post</span>
        </div>
      </div>
      <div>
        <TweetCard
          {...tweet}
          currentUserId={session?.user.id}
          isOnTweetPage={true}
        />
        {tweet.replies.map((reply) => (
          <TweetCard
            {...reply}
            key={reply.id}
            currentUserId={session?.user.id}
          />
        ))}
      </div>
    </div>
  );
}

export default TweetPage;
