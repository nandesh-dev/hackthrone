import * as React from "react";
import { IconFolder, IconHome, IconUsers } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/user";

const NAV_ITEMS = [
  {
    title: "Home",
    url: "/",
    icon: IconHome,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: IconFolder,
  },
  {
    title: "Socials",
    url: "/socials",
    icon: IconUsers,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const userQuery = useQuery({ queryFn: getUser, queryKey: [] });
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <span className="text-base font-semibold">Research Hive</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => navigate(item.url)}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <a>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row px-2">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarFallback className="rounded-lg">
                {(userQuery.data?.name || "-")[0]}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {userQuery.data?.name || "- - -"}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {userQuery.data?.email || "- - -"}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
