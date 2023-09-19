"use server";
import { db } from "@/lib/prisma";

export const handlefollow = async (
  currentUserId: string,
  userIdTofollow: string
) => {
  try {
    const isfollowing = await db.follows.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userIdTofollow,
      },
    });
    if (isfollowing) {
      await db.follows.delete({
        where: {
          id: isfollowing.id,
        },
      });
    } else {
      await db.follows.create({
        data: {
          followerId: currentUserId,
          followingId: userIdTofollow,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
