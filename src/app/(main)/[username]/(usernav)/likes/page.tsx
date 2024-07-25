import TweetCard from "@/components/TweetCard/TweetCard";
import { authOptions } from "@/lib/auth";

import { getLikedTweets } from "@/utils/getLikedTweets";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function Likes({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions);

  const tweets = await getLikedTweets(
    {
      LikedByUser: {
        username: params.username,
      },
    },
    session?.user.id
  );
  if (tweets.length === 0) {
    notFound();
  }
  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} {...tweet} currentUserId={session?.user.id} />
      ))}
    </div>
  );
}

export default Likes;
