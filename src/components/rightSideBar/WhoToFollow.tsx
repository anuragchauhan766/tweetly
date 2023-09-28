"use client";
import { getUsers } from "@/utils/getUsers";
import { Session } from "next-auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import React from "react";
import LoadingSpinner from "../common/button/LoadingSpinner";

function WhoToFollow(props: { session: Session }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["whotofollow", props.session.user.id],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getUsers(props.session.user.id, {
          page: pageParam,
          take: 3,
        });
        return res;
      },
      getNextPageParam: (lastpage, pages) => {
        return lastpage?.length === 0 ? undefined : pages.length + 1;
      },
    });

  return (
    <div className="flex flex-col w-full bg-custom-gray rounded-2xl  space-y-3">
      <div className="px-4 pt-3">
        <h3 className="font-bold text-xl text-white tracking-wider">
          Who to follow
        </h3>
      </div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page?.map((people) => (
            <ProfileCard
              key={people.id}
              {...people}
              currentUserId={props.session.user.id}
            />
          ))}
        </React.Fragment>
      ))}
      <div className="w-full flex items-center last:rounded-b-2xl hover:bg-white/10 transition duration-200 px-4 py-3  bg-transparent">
        <button
          type="button"
          className="w-full grid place-items-center h-full text-blue"
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
