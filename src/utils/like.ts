"use server";
import { db } from "@/lib/prisma";
import { LikeHandler } from "@/types/Tweet";
import { revalidatePath } from "next/cache";

export const toggleLikeHandler: LikeHandler = async ({ userId, tweetId }) => {
  try {
    
    const res = await db.like.findUnique({
      where: {
        LikeUniqueId: {
          tweetId: tweetId,
          LikedByUserId: userId,
        },
      },
    });
    if (res === null) {
      await db.like.create({
        data: {
          LikedByUserId: userId,
          tweetId: tweetId,
        },
      });
    } else {
      await db.like.delete({
        where: {
          LikeUniqueId: {
            LikedByUserId: userId,
            tweetId: tweetId,
          },
        },
      });
    }
    revalidatePath("/home");
  } catch (error) {
    throw new Error("Cannot like/unlike tweet", { cause: error });
  }
};
