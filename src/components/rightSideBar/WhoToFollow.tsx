"use client";
import { getUsers } from "@/utils/getUsers";
import { Session } from "next-auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import React from "react";
import LoadingSpinner from "../common/button/LoadingSpinner";

function WhoToFollow(props: { session: Session | null }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["whotofollow", props.session?.user.id || "default User"],
      queryFn: async ({ pageParam }) => {
        const res = await getUsers(
          {
            page: pageParam,
            take: 3,
          },
          props.session?.user.id
        );
        return res;
      },
      initialPageParam: 1,
      getNextPageParam: (lastpage, pages) => {
        return lastpage?.length === 0 ? undefined : pages.length + 1;
      },
    });

  return (
    <div className="flex w-full flex-col space-y-3 rounded-2xl bg-custom-gray">
      <div className="px-4 pt-3">
        <h3 className="text-xl font-bold tracking-wider text-white">
          Who to follow
        </h3>
      </div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page?.map((people) => (
            <ProfileCard
              key={people.id}
              {...people}
              currentUserId={props.session?.user.id}
            />
          ))}
        </React.Fragment>
      ))}
      <div className="flex w-full items-center bg-transparent px-4 py-3 transition duration-200 last:rounded-b-2xl hover:bg-white/10">
        <button
          type="button"
          className="grid h-full w-full place-items-center text-blue"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <LoadingSpinner />
          ) : hasNextPage ? (
            "Show More"
          ) : (
            "Nothing more to load"
          )}
        </button>
      </div>
    </div>
  );
}

export default WhoToFollow;
