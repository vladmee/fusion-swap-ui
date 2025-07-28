import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { HStack, VStack } from "@/components/ui/stack";
import { SiGithub } from "@icons-pack/react-simple-icons";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="relative" {...props}>
      <SidebarHeader className="border-sidebar-border border-b p-3 group-data-[collapsible=icon]:p-2">
        <Link
          href="/"
          className="hover:bg-sidebar-accent/50 rounded-lg p-2 transition-colors group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
        >
          <HStack className="items-center group-data-[collapsible=icon]:justify-center">
            <Logo className="group-data-[collapsible=icon]:size-6" />
          </HStack>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0 pt-2">all swaps here...</SidebarContent>
      <SidebarFooter className="flex flex-col gap-2 p-3 group-data-[collapsible=icon]:p-2">
        <SidebarMenuButton
          asChild
          className="hover:bg-sidebar-accent/50 h-fit w-full rounded-lg p-2 transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2"
        >
          <Link
            href="https://github.com/vladmee/fusion-swap-ui"
            target="_blank"
            className="flex items-center gap-3 px-3 transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
          >
            <SiGithub className="text-sidebar-accent-foreground !size-6 group-data-[collapsible=icon]:mx-auto" />
            <VStack className="items-start gap-0 overflow-hidden transition-all group-data-[collapsible=icon]:w-0">
              <h3 className="shimmer-text text-sidebar-foreground truncate font-medium">
                See the source code
              </h3>
            </VStack>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
