"use server";
import { tweetsWithAutherAndLikes } from "@/utils/Queries/tweet";
import { db } from "@/lib/prisma";

export const getHomeTimelineTweets = async (
  userId: string,
  options: { take: number; page: number }
) => {
  let res: any[] = [];
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: true,
      },
    });
    if (user?.following.length === 0) {
    
      res = await db.tweet.findMany({
        take: options.take,
        orderBy: {
          createdAt: "desc",
        },

        ...tweetsWithAutherAndLikes,
      });
    } else {
     

      res = await db.tweet.findMany({
        take: options.take,
        skip: (options.page - 1) * options.take,
        where: {
          OR: [
            {
              auther: {
                follower: {
                  some: {
                    followerId: userId,
                  },
                },
              },
            },
            {
              likes: {
                some: {
                  LikedByUser: {
                    follower: {
                      some: {
                        followerId: userId,
                      },
                    },
                  },
                },
              },
            },
            {
              replies: {
                some: {
                  auther: {
                    follower: {
                      some: {
                        followerId: userId,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },

        ...tweetsWithAutherAndLikes,
      });
    }
    const userOwnTweets = await db.tweet.findMany({
      where: {
        autherId: userId,
      },
      take: options.take,
      skip: (options.page - 1) * options.take,
      orderBy: {
        createdAt: "desc",
      },
      ...tweetsWithAutherAndLikes,
    });
    const allTweets = [...res, ...userOwnTweets];
    const uniqueTweets = Array.from(
      new Set(allTweets.map((tweet) => tweet.id))
    ).map((id) => allTweets.find((tweet) => tweet.id === id));
    const sortedTweets = uniqueTweets.sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
    const tweetsWithLikes = sortedTweets.map((tweet) => ({
      ...tweet,
      isLikedByCurrentUser: tweet.likes.some(
        (like: any) => like.LikedByUserId === userId
      ),
    }));

    return tweetsWithLikes;
  } catch (error) {
    throw error;
  }
};
