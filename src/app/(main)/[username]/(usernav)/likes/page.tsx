import TweetCard from "@/components/TweetCard/TweetCard";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exception";
import { getLikedTweets } from "@/utils/getLikedTweets";
import { getServerSession } from "next-auth";
import React from "react";

async function Likes({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthRequiredError();
  const tweets = await getLikedTweets(session.user.id);
  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} currentUserId={session.user.id} />
      ))}
    </div>
  );
}

export default Likes;
