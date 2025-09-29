import { Link } from "@/i18n/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const FollowSuggestions = () => {
  return (
    <div className="bg-default-background flex min-w-[320px] flex-col items-start gap-6 rounded-md border border-solid px-6 py-6">
      <span className="w-full font-semibold">Suggested for you</span>
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full items-center gap-4">
          <Link href={"/users/id"}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" sizes="large" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex shrink-0 grow basis-0 flex-col items-start">
            <Link href={"/users/id"} className="text-grey-dark text-sm font-medium">
              Chris Morgan
            </Link>
            <Link href={"/users/id"} className="text-grey-light text-xs">
              @chrismorgan
            </Link>
          </div>
          <Button
            variant="secondary"
            // onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};
