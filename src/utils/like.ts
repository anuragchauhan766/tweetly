"use server";
import { db } from "@/lib/prisma";
import { LikeHandler } from "@/types/Tweet";
import { revalidatePath } from "next/cache";

export const addLike: LikeHandler = async ({ userId, tweetId }) => {
  try {
    await db.like.create({
      data: {
        LikedByUserId: userId,
        tweetId: tweetId,
      },
    });
    revalidatePath("/home");
  } catch (error) {
    console.error(error);
  }
};
export const removeLike: LikeHandler = async ({ userId, tweetId }) => {
  try {
    await db.like.delete({
      where: {
        LikeUniqueId: {
          LikedByUserId: userId,
          tweetId: tweetId,
        },
      },
    });
    revalidatePath("/home");
  } catch (error) {
    console.error(error);
  }
};

export const isLiked: LikeHandler = async ({ userId, tweetId }) => {
  try {
    const res = await db.like.findUnique({
      where: {
        LikeUniqueId: {
          LikedByUserId: userId,
          tweetId: tweetId,
        },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
