import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// queries for relation field and select field
export const TweetQueries = Prisma.validator<Prisma.TweetDefaultArgs>()({
  include: {
    _count: {
      select: {
        likes: true,
      },
    },
    likes: {
      select: {
        LikedByUserId: true,
      },
    },
    auther: {
      select: {
        username: true,
        image: true,
        name: true,
      },
    },
  },
});
export const getTweet = async (tweetId: string, userId: string) => {
  "use server";
  try {
    const tweet = await db.tweet.findUnique({
      where: {
        id: tweetId,
      },
      ...TweetQueries,
    });
    if (!tweet) {
      return;
    }
    const tweetsWithLikes = {
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === userId
      ),
    };

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};
