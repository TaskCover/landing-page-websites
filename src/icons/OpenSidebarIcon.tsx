import useTheme from "hooks/useTheme";
import React from "react";

const OpenSidebarIcon = () => {
  const { isDarkMode } = useTheme();
  const color: string = isDarkMode ? "white" : "#212429";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.97 22.75H8.96997C3.53997 22.75 1.21997 20.43 1.21997 15V9C1.21997 3.57 3.53997 1.25 8.96997 1.25H14.97C20.4 1.25 22.72 3.57 22.72 9V15C22.72 20.43 20.41 22.75 14.97 22.75ZM8.96997 2.75C4.35997 2.75 2.71997 4.39 2.71997 9V15C2.71997 19.61 4.35997 21.25 8.96997 21.25H14.97C19.58 21.25 21.22 19.61 21.22 15V9C21.22 4.39 19.58 2.75 14.97 2.75H8.96997Z"
        fill={color}
      />
      <path
        d="M7.96997 22.75C7.55997 22.75 7.21997 22.41 7.21997 22V2C7.21997 1.59 7.55997 1.25 7.96997 1.25C8.37997 1.25 8.71997 1.59 8.71997 2V22C8.71997 22.41 8.38997 22.75 7.96997 22.75Z"
        fill={color}
      />
      <path
        d="M14.9701 15.3109C14.7801 15.3109 14.5901 15.2409 14.4401 15.0909L11.8801 12.5309C11.5901 12.2409 11.5901 11.7609 11.8801 11.4709L14.4401 8.91086C14.7301 8.62086 15.2101 8.62086 15.5001 8.91086C15.7901 9.20086 15.7901 9.68086 15.5001 9.97086L13.4801 12.0009L15.5101 14.0309C15.8001 14.3209 15.8001 14.8009 15.5101 15.0909C15.3601 15.2409 15.1701 15.3109 14.9701 15.3109Z"
        fill={color}
      />
    </svg>
  );
};

export default OpenSidebarIcon;