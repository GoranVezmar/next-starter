export const FeedPostCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse items-start border-b border-solid px-6 py-6">
      {/* Avatar and vertical line */}
      <div className="flex flex-col items-center self-stretch">
        <div className="hidden w-0.5 shrink-0 grow basis-0 flex-col items-center gap-2 bg-gray-200 dark:bg-gray-700" />
        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="hidden w-0.5 shrink-0 grow basis-0 flex-col items-center gap-2 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Content section */}
      <div className="flex shrink-0 grow basis-0 flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-4 pt-1 pl-3">
          {/* Header */}
          <div className="flex w-full flex-col items-start gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-4 w-30 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Message */}
            <div className="mt-4 flex w-full flex-col items-start gap-1">
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Image preview */}
          <div className="flex w-full flex-col items-start gap-3 overflow-hidden">
            <div className="flex w-full flex-col items-start gap-4 overflow-hidden rounded-md shadow-sm">
              <div className="h-64 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Post Actions Placeholder */}
        <div className="flex w-full gap-4 pl-3">
          <div className="h-4 w-1/5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/5 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};
