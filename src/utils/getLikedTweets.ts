import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { tweetsWithAutherAndLikes } from "./getHomeTimelineTweets";
// queries for relation field and select field
export const likedTweets = Prisma.validator<Prisma.LikeDefaultArgs>()({
  select: {
    tweet: {
      ...tweetsWithAutherAndLikes,
    },
  },
});
export const getLikedTweets = async (userId: string) => {
  "use server";
  try {
    const res = await db.like.findMany({
      where: {
        LikedByUserId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      ...likedTweets,
    });
    const tweets = res.map((like) => like.tweet);

    const tweetsWithLikes = tweets.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: true,
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};
