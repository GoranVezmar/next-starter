import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

type FetchPostsProps = {
  userId?: string;
};

const fetchPosts = async ({ userId }: FetchPostsProps) => {
  const res = await api.posts.$get({
    query: {
      userId,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.posts;
};

type UsePostsProps = {
  userId?: string;
};

export const useGetPosts = ({ userId }: UsePostsProps) => {
  return useQuery({
    queryKey: userId ? ["user-posts"] : ["all-posts"],
    queryFn: () => fetchPosts({ userId }),
    staleTime: 1000 * 60, // cache for 1 minute
  });
};
