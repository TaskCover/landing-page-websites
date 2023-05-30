export type SidebarItem = {
  label: string;
  iconSrc: string;
  url: string;
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    iconSrc: "/images/sidebar_dashboard.png",
    url: "/dashboard",
  },
  {
    label: "Project",
    iconSrc: "/images/sidebar_project.png",
    url: "/project",
  },
  {
    label: "Time Tracking",
    iconSrc: "/images/sidebar_time_tracking.png",
    url: "/time_tracking",
  },
  {
    label: "Document",
    iconSrc: "/images/sidebar_document.png",
    url: "/document",
  },
];

export const isSidebarItemSelected = (url: string, index: number): boolean => {
  if (url.indexOf(sidebarItems[index].url) >= 0) {
    return true;
  }
  return false;
};

export const getSidebarItemSelected = (url: string): SidebarItem => {
  return sidebarItems.filter(
    (sidebarItem) => url.indexOf(sidebarItem.url) >= 0
  )[0];
};
