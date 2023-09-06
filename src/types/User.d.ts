import { usersQueries } from "@/utils/getUsers";
import { Prisma } from "@prisma/client";

export type ProfileCardProps = Prisma.UserGetPayload<typeof usersQueries>;
