import CameraIcon from "icons/CameraIcon";
import DeleteChatIcon from "icons/DeleteChatIcon";
import GroupChatIcon from "icons/GroupChatIcon";
import LeaveGroupIcon from "icons/LeaveGroupIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import SearchIcon from "icons/SearchIcon";
import { useState } from "react";

interface MenuItem {
  text: string;
  icon: JSX.ElementType;
  stroke?: string;
  borderBottom?: boolean;
  callback?: () => void;
}

export const useGroupChat = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const topMenuItems: MenuItem[] = [
    {
      text: "Change group photo",
      icon: CameraIcon,
      stroke: "#8950FC",
    },
  ];

  const midMenuItems: MenuItem[] = [
    {
      text: "Members",
      icon: GroupChatIcon,
      stroke: "#3699FF",
      borderBottom: true,
    },
    {
      text: "Media files, files and links",
      icon: MediaFileIcon,
      stroke: "#1BC5BD",
      borderBottom: true,
    },
    {
      text: "Search in conversation",
      icon: SearchIcon,
      stroke: "#999999",
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      text: "Delete conversation",
      icon: DeleteChatIcon,
      borderBottom: true,
    },
    {
      text: "Leave the group",
      icon: LeaveGroupIcon,
    },
  ];

  const menuItems: MenuItem[] = [
    ...topMenuItems,
    ...midMenuItems,
    ...bottomMenuItems,
  ];

  return {
    onOpenDrawer,
    closeDrawer,
    isDrawerOpen,
    topMenuItems,
    midMenuItems,
    bottomMenuItems,
  };
};
