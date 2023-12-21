"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Wine } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <Wine className="h-4 w-4" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Dashboard
        </Link>
        <Link
          href="/wine"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Wine
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            <p>Cellar</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="text-foreground/60 transition-colors hover:text-foreground/80 "
          >
            <DropdownMenuItem>Find</DropdownMenuItem>
            <DropdownMenuItem>Add </DropdownMenuItem>
            <DropdownMenuItem>
              {" "}
              <Link
                href="/test"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                Test
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
