import Image from "next/image";

import { Link } from "@/i18n/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { PostActions } from "./post-actions";

export const FeedPostCard = () => {
  return (
    <div className="flex w-full items-start border-b border-solid px-6 py-6">
      <div className="flex flex-col items-center self-stretch">
        <div className="hidden w-0.5 shrink-0 grow basis-0 flex-col items-center gap-2" />
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="hidden w-0.5 shrink-0 grow basis-0 flex-col items-center gap-2" />
      </div>
      <div className="flex shrink-0 grow basis-0 flex-col items-start gap-4">
        <div className="flex w-full flex-col items-start gap-4 pt-1 pl-3">
          <div className="flex w-full flex-col items-start gap-1">
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-grey-dark text-sm font-medium">Subframe</span>
              <Button asChild variant="link" size="sm" className="px-0">
                <Link href={"/users/id"} target="_blank">
                  @subframeapp
                </Link>
              </Button>
              <span className="text-grey-light text-sm">•</span>
              <span className="text-grey-light text-sm">2h ago</span>
            </div>
            <div className="flex w-full flex-col items-start gap-1">
              <span className="text-grey-dark w-full">Watch how to get started with Subframe in just a few minutes</span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3 overflow-hidden">
            <div className="flex w-full flex-col items-start gap-4 overflow-hidden rounded-md shadow-sm">
              <Image
                alt="Post image"
                width={500}
                height={300}
                className="w-full flex-none"
                src="https://res.cloudinary.com/subframe/image/upload/v1713908895/uploads/279/fgotrrosb9jl6bryufsx.avif"
              />
            </div>
          </div>
        </div>
        <PostActions />
      </div>
    </div>
  );
};
