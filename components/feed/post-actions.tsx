"use client";

import { Bookmark, Ellipsis, Flag, Heart, Link as LinkIcon, MessageCircle, Repeat } from "lucide-react";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const PostActions = () => {
  const actions = [
    {
      icon: <MessageCircle />,
      label: "Comment",
      value: 4,
      handler: () => {},
    },
    {
      icon: <Repeat />,
      label: "Repost",
      handler: () => {},
    },
    {
      icon: <Heart />,
      label: "Like",
      value: 72,
      handler: () => {},
    },
    {
      icon: <Bookmark />,
      label: "Save",
      handler: () => {},
    },
  ];

  return (
    <div className="flex w-full items-center justify-between">
      {actions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <Button variant="ghost" onClick={action.handler}>
                {action.icon}
                {action.value && <span>{action.value}</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center" sideOffset={4}>
              <Tooltip>{action.label}</Tooltip>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button
            variant="ghost"
            // onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent side="bottom" align="end" sideOffset={4}>
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <LinkIcon />
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Flag />
                <span>Report</span>
              </DropdownMenuItem>
            </>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};
