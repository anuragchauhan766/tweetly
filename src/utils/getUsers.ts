import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const usersQueries = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    username: true,
    name: true,
    image: true,
  },
});
export const getUsers = async () => {
  try {
    const users = await db.user.findMany({
      ...usersQueries,
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};
