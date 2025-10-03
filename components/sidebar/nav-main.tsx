"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import clsx from "clsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const menuButtonClass = "bg-accent-foreground text-accent hover:bg-accent-foreground hover:text-accent";

  const handleClick = (url :string, title :string) => {
    setSelected(title)
    router.push(url);
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton className={selected == item.title ? menuButtonClass : ""} onClick={() => handleClick(item.url, item.title)} tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
