"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const UserDetailsRelationqueries = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    _count: {
      select: {
        followers: true,
        following: true,
      },
    },
  },
});

export const getUserDetails = async (username: string) => {
  try {
    const res = await db.user.findUnique({
      where: {
        username: username,
      },
      ...UserDetailsRelationqueries,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
