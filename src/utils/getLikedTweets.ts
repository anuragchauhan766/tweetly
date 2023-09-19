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
export const getLikedTweets = async (
  where: Prisma.LikeWhereInput,
  currentUserId: string
) => {
  "use server";
  try {
    const res = await db.like.findMany({
      where: {
        ...where,
      },
      orderBy: {
        createdAt: "desc",
      },
      ...likedTweets,
    });
    const tweets = res.map((like) => like.tweet);

    const tweetsWithLikes = tweets.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === currentUserId
      ),
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};
