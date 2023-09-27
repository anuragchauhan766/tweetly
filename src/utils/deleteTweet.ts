"use server";

import { db } from "@/lib/prisma";

export const deleteTweet = async (tweetId: string) => {
  try {
    await db.tweet.delete({
      where: {
        id: tweetId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
