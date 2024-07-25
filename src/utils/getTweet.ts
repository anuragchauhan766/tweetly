import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// queries for relation field and select field
export const TweetQueries = Prisma.validator<Prisma.TweetDefaultArgs>()({
  include: {
    _count: {
      select: {
        likes: true,
        replies: true,
      },
    },
    replies: {
      include: {
        _count: {
          select: {
            likes: true,
            replies: true,
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
export const getTweet = async (tweetId: string, userId?: string) => {
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

    const repliesWithLikes = tweet.replies.map((reply) => ({
      ...reply,
      isLikedByCurrentUser: reply.likes.some(
        (like) => like.LikedByUserId === userId
      ),
    }));
    const tweetWithLikes = {
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like) => like.LikedByUserId === userId
      ),
      replies: repliesWithLikes,
    };

    return tweetWithLikes;
  } catch (error) {
    throw error;
  }
};

