"use client";
import TweetCard from "@/components/TweetCard/TweetCard";
import type { TweetCardProps } from "@/types/Tweet";
import { getHomeTimelineTweets } from "@/utils/getHomeTimelineTweets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import React from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../common/button/LoadingSpinner";
function Timeline(props: { session: Session | null }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["timeline", props.session?.user.id || "default User" ],
      queryFn: async ({ pageParam  }) => {
        return await getHomeTimelineTweets( {
          page: pageParam,
          take: 10,
        },props.session?.user.id);
      },
      initialPageParam:1,
      getNextPageParam: (lastpage, pages) => {
        return lastpage?.length === 0 ? undefined : pages.length + 1;
      },
    });
  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  if (status === "pending") {
    return (
      <div className="grid place-items-center p-6 text-blue">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page?.map((tweet) => {
            const tweetCardProps: TweetCardProps = {
              ...tweet,
              pageNumber: i,
              currentUserId: props.session?.user.id,
            };

            return <TweetCard key={tweet.id} {...tweetCardProps} />;
          })}
        </React.Fragment>
      ))}
      <div ref={ref} className="grid place-items-center p-6 text-blue">
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : hasNextPage ? (
          "Load Newer"
        ) : (
          "Nothing more to load"
        )}
      </div>
    </>
  );
}

export default Timeline;
