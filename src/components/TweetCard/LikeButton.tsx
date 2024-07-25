"use client";
import { toggleLikeHandler } from "@/utils/like";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoginDialog } from "@/context/LoginDialogContext";

interface LikeProps {
  userId?: string;
  tweetId: string;
  LikeCount: number;
  isLikedByCurrentUser: boolean;
  pageNumber?: number;
}

function LikeButton({ userId, ...props }: LikeProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { setIsLoginDialogVisible } = useLoginDialog();
  const [optimisticLike, setOptimisticLike] = useOptimistic({
    isLikedByCurrentUser: props.isLikedByCurrentUser,
    LikeCount: props.LikeCount,
  });

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userId) {
      setIsLoginDialogVisible(true);
      return;
    }
    e.stopPropagation();
    setOptimisticLike((prev) => ({
      isLikedByCurrentUser: !prev.isLikedByCurrentUser,
      LikeCount: prev.isLikedByCurrentUser
        ? prev.LikeCount - 1
        : prev.LikeCount + 1,
    }));

    // start transition for server request work
    startTransition(() => {
      toggleLikeHandler({ userId: userId, tweetId: props.tweetId });
      queryClient.invalidateQueries({
        queryKey: ["timeline", userId],
        refetchType: "active",
      });
      // router.refresh();
    });
  };

  return (
    <button
      // disabled={isPending}
      className="group/like z-[10] flex cursor-pointer items-center justify-center space-x-2"
      onClick={toggleLike}
    >
      <div className="rounded-full p-3 group-hover/like:bg-pink/20">
        {optimisticLike.isLikedByCurrentUser ? (
          <AiFillHeart className="fill-pink text-lg group-hover/like:text-pink" />
        ) : (
          <AiOutlineHeart className="text-lg group-hover/like:text-pink" />
        )}
      </div>
      <span className="text-sm group-hover/like:text-pink">
        {optimisticLike.LikeCount}
      </span>
    </button>
  );
}

export default LikeButton;
