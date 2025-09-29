"use client";

import { redirect } from "next/navigation";

import { getInitials } from "@/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CreditCard, LogOut, Newspaper, Palmtree, Settings, ShoppingBag, User as UserIcon } from "lucide-react";

import { User } from "@/server/schemas/auth.schema";

import { Link } from "@/i18n/navigation";

import { signOut } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

type UserProfileDropdownProps = {
  user: User;
};

// TODO translate this
export const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end" sideOffset={6}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/feed/create-post">
            <DropdownMenuItem>
              <Newspaper />
              Create Post
            </DropdownMenuItem>
          </Link>
          <Link href="/vacations/create-vacation">
            <DropdownMenuItem>
              <Palmtree />
              Create Vacation
            </DropdownMenuItem>
          </Link>
          <Link href="/shop/create-product">
            <DropdownMenuItem>
              <ShoppingBag />
              Create Product
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <UserIcon />
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/billing">
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut()
              .catch((err) => {
                alert("Failed to log out");
                console.error(err);
              })
              .finally(() => {
                redirect("/sign-in");
              });
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
