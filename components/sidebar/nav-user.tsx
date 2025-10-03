"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { ClerkProvider, UserButton, useUser } from "@clerk/nextjs";

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { user: currentUser, isLoaded, isSignedIn } = useUser();

  return (
    <SidebarMenu>
      <SidebarSeparator className="bg-border my-4"/>
      <SidebarMenuItem className="flex gap-2">
              <UserButton/>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentUser?.fullName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {currentUser?.primaryEmailAddress?.toString()}
                </span>
              </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
