// import { MainNavItem, SidebarNavItem } from "types/nav"

import { MainNavItem, SidebarNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Wine",
      href: "/wine",
    },

    // {
    //   title: "GitHub",
    //   href: "https://github.com/shadcn/ui",
    //   external: true,
    // },
  ],

  sidebarNav: [
    {
      title: "Cellar",
      items: [
        {
          title: "Find",
          href: "/",
          items: [],
        },
        {
          title: "Add",
          href: "/",
          items: [],
        },
        {
          title: "Test",
          href: "/test",
          items: [],
        },
      ],
    },
  ],
};
