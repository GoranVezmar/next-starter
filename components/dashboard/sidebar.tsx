"use client";

import { useEffect } from "react";

import { Box, ChevronRight, Newspaper, ShoppingBag, TreePalm, User } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  Sidebar as SidebarUI,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Users (TBD)",
    icon: User,
    url: "/users",
  },
  {
    title: "Feed (TBD)",
    icon: Newspaper,
    subItems: [
      {
        title: "My Timeline",
        url: "/feed",
      },
      {
        title: "Create Post",
        url: "/feed/create-post",
      },
      // two tabs with followers and following
      {
        title: "My network",
        url: "/feed/my-network",
      },
      {
        title: "Messaging",
        url: "/feed/messaging",
      },
    ],
  },
  {
    title: "Vacations (TBD)",
    icon: TreePalm,
    subItems: [
      {
        title: "All Vacations",
        url: "/vacations",
      },
      {
        title: "My Vacations",
        url: "/vacations/my-vacations",
      },
      {
        title: "Create Vacation",
        url: "/vacations/create-vacation",
      },
    ],
  },
  {
    title: "Shop (TBD)",
    icon: ShoppingBag,
    subItems: [
      {
        title: "All Products",
        url: "/shop",
      },
      {
        title: "Categories",
        url: "/shop/categories",
      },
      {
        title: "My Products",
        url: "/shop/my-products",
      },
      {
        title: "Create Product",
        url: "/shop/create-product",
      },
    ],
  },
  {
    title: "3D playground",
    icon: Box,
    subItems: [
      {
        title: "Simple geometry (Leva controlls)",
        url: "/playground-3d/cubes",
      },
      {
        title: "Shaders",
        url: "/playground-3d/shader-images",
      },
    ],
  },
  // TODO this will be subscription based
  // {
  //   title: "Jobs",
  //   icon: ShoppingBag,
  //   subItems: [
  //     {
  //       title: "All Products",
  //       url: "/shop",
  //     },
  //     {
  //       title: "Categories",
  //       url: "/shop/categories",
  //     },
  //     {
  //       title: "My Products",
  //       url: "/shop/my-products",
  //     },
  //     {
  //       title: "Create Product",
  //       url: "/shop/create-product",
  //     },
  //   ],
  // },
];

export const Sidebar = ({ ...props }: React.ComponentProps<typeof SidebarUI>) => {
  const pathname = usePathname();
  const { open, setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [setOpenMobile, pathname]);

  return (
    <SidebarUI collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2 pt-2 text-2xl font-bold">{open ? "Logo" : "L"}</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              if (!item.subItems) {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              const isActive = item.subItems?.some((subItem) => pathname.startsWith(subItem.url));

              return (
                <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarUI>
  );
};
