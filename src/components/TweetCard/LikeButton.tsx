"use client";
import { toggleLikeHandler } from "@/utils/like";
import { experimental_useOptimistic as useOptimistic } from "react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeProps {
  userId: string;
  tweetId: string;
  LikeCount: number;
  isLikedByCurrentUser: boolean;
}

function LikeButton(props: LikeProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [optimisticLike, setOptimisticLike] = useOptimistic({
    isLikedByCurrentUser: props.isLikedByCurrentUser,
    LikeCount: props.LikeCount,
  });

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOptimisticLike((prev) => ({
      isLikedByCurrentUser: !prev.isLikedByCurrentUser,
      LikeCount: prev.isLikedByCurrentUser
        ? prev.LikeCount - 1
        : prev.LikeCount + 1,
    }));

    // start transition for server request work
    startTransition(() => {
      toggleLikeHandler({ userId: props.userId, tweetId: props.tweetId });
      router.refresh();
    });
  };

  return (
    <button
      // disabled={isPending}
      className="flex items-center justify-center space-x-2 group/like cursor-pointer z-[8]"
      onClick={toggleLike}
    >
      <div className="p-3 rounded-full group-hover/like:bg-pink/20">
        {optimisticLike.isLikedByCurrentUser ? (
          <AiFillHeart className="group-hover/like:text-pink text-lg fill-pink" />
        ) : (
          <AiOutlineHeart className="group-hover/like:text-pink text-lg" />
        )}
      </div>
      <span className="group-hover/like:text-pink text-sm">
        {optimisticLike.LikeCount}
      </span>
    </button>
  );
}

export default LikeButton;
