"use client";
import TweetCard from "@/components/TweetCard/TweetCard";
import type { TweetCardProps } from "@/types/Tweet";
import { getHomeTimelineTweets } from "@/utils/getHomeTimelineTweets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import React from "react";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../common/button/LoadingSpinner";
function Timeline(props: { session: Session }) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["timeline", props.session.user.id],
      queryFn: async ({ pageParam = 1 }) => {
        return await getHomeTimelineTweets(props.session.user.id, {
          page: pageParam,
          take: 10,
        });
      },
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
  if (status === "loading") {
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
              currentUserId: props.session.user.id,
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
