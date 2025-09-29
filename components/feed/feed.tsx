"use client";

import { useGetPosts } from "@/stores/query/getters/use-get-posts";

import { User } from "@/server/schemas/auth.schema";

import { useUserCountry } from "@/hooks/use-user-country";

import { FeedPostCard } from "./feed-post-card";
import { FeedPostCardSkeleton } from "./feed-post-card-skeleton";
import { FollowSuggestions } from "./follow-suggestions";

type FeedProps = {
  user?: User;
};

export const Feed = ({ user }: FeedProps) => {
  const { isPending, data: posts, error } = useGetPosts({ userId: user?.id });
  const country = useUserCountry();

  return (
    <div className="mobile:px-0 mobile:pt-0 mobile:pb-12 flex h-full w-full items-start justify-center px-6">
      <div className="flex max-w-[576px] shrink-0 grow basis-0 flex-col items-start overflow-auto border-x border-solid">
        <div className="flex h-20 w-full flex-none items-center border-b border-solid px-6 py-6">
          <span className="font-semibold">For You {country === "BR" && "Hi from Brazil!"}</span>
        </div>
        {error && (
          <div className="flex w-full items-center justify-center border-b border-solid px-6 py-6">
            <span className="text-grey-light text-sm">{error.message}</span>
          </div>
        )}
        {isPending && [...Array(5)].map((_, index) => <FeedPostCardSkeleton key={index} />)}
        {posts?.map((post) => <FeedPostCard key={post.id} />)}
      </div>
      <div className="mobile:hidden flex flex-col items-start gap-2 self-stretch px-6 py-6">
        <FollowSuggestions />
      </div>
    </div>
  );
};
