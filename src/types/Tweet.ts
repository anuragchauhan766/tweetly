import { tweetsWithAutherAndLikes } from "@/utils/Queries/tweet";
import {
  getRepliesWithParentTweet
} from "@/utils/getRepliesWithParentTweet";
import { Prisma } from "@prisma/client";

export type TweetsWithAutherAndLikes = Prisma.TweetGetPayload<
  typeof tweetsWithAutherAndLikes
>;
export type TweetCardProps = TweetsWithAutherAndLikes & {
  currentUserId?: string;
  isLikedByCurrentUser: boolean;
  isOnTweetPage?: boolean;
  isParentTweetwithReply?: boolean;
  pageNumber?: number;
};
export type LikeHandler = ({
  userId,
  tweetId,
}: {
  userId: string;
  tweetId: string;
}) => Promise<void | unknown>;

export type RepliesWithParentTweet = Prisma.PromiseReturnType<
  typeof getRepliesWithParentTweet
>[0];
