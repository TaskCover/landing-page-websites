import { Box, IconButton, Typography } from "@mui/material";
import ArrowDownIcon from "icons/ArrowDownIcon";
import FileIcon from "icons/FileIcon";
import LinkIcon from "icons/LinkIcon";
import MediaFileIcon from "icons/MediaFileIcon";
import UserIcon from "icons/UserIcon";
import ChatDetailInfoMenuItem from "./ChatDetailInfoMenuItem";

interface MenuItem {
  text: string;
  icon: JSX.Element;
}

const ChatDetailInfoMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      text: "Account infomation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10.0999 10.65C10.0416 10.6417 9.9666 10.6417 9.89994 10.65C8.43327 10.6 7.2666 9.39998 7.2666 7.92498C7.2666 6.41665 8.48327 5.19165 9.99993 5.19165C11.5083 5.19165 12.7333 6.41665 12.7333 7.92498C12.7249 9.39998 11.5666 10.6 10.0999 10.65Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.6166 16.15C14.1333 17.5083 12.1666 18.3333 9.99997 18.3333C7.8333 18.3333 5.86663 17.5083 4.3833 16.15C4.46663 15.3667 4.96663 14.6 5.8583 14C8.14163 12.4833 11.875 12.4833 14.1416 14C15.0333 14.6 15.5333 15.3667 15.6166 16.15Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6024 18.3334 10C18.3334 5.39765 14.6025 1.66669 10.0001 1.66669C5.39771 1.66669 1.66675 5.39765 1.66675 10C1.66675 14.6024 5.39771 18.3334 10.0001 18.3334Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      text: "Media file",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
            stroke="#666666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.5001 12.5L13.3334 8.33331L4.16675 17.5"
            stroke="#666666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.08325 8.33331C7.77361 8.33331 8.33325 7.77367 8.33325 7.08331C8.33325 6.39296 7.77361 5.83331 7.08325 5.83331C6.3929 5.83331 5.83325 6.39296 5.83325 7.08331C5.83325 7.77367 6.3929 8.33331 7.08325 8.33331Z"
            stroke="#666666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      text: "Link",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_0_1344)">
            <path
              d="M12.4999 5.83337H14.9999C15.5471 5.83337 16.0889 5.94115 16.5944 6.15054C17.1 6.35994 17.5593 6.66685 17.9462 7.05376C18.3331 7.44067 18.64 7.9 18.8494 8.40553C19.0588 8.91105 19.1666 9.45287 19.1666 10C19.1666 10.5472 19.0588 11.089 18.8494 11.5946C18.64 12.1001 18.3331 12.5594 17.9462 12.9463C17.5593 13.3332 17.1 13.6401 16.5944 13.8495C16.0889 14.0589 15.5471 14.1667 14.9999 14.1667H12.4999M7.49992 14.1667H4.99992C4.45274 14.1667 3.91093 14.0589 3.4054 13.8495C2.89988 13.6401 2.44055 13.3332 2.05364 12.9463C1.27224 12.1649 0.833252 11.1051 0.833252 10C0.833252 8.89497 1.27224 7.83516 2.05364 7.05376C2.83504 6.27236 3.89485 5.83337 4.99992 5.83337H7.49992"
              stroke="#666666"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.66675 10.0002H13.3334"
              stroke="#666666"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_1344">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      text: "File",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10.8333 1.66669H4.99992C4.55789 1.66669 4.13397 1.84228 3.82141 2.15484C3.50885 2.4674 3.33325 2.89133 3.33325 3.33335V16.6667C3.33325 17.1087 3.50885 17.5326 3.82141 17.8452C4.13397 18.1578 4.55789 18.3334 4.99992 18.3334H14.9999C15.4419 18.3334 15.8659 18.1578 16.1784 17.8452C16.491 17.5326 16.6666 17.1087 16.6666 16.6667V7.50002L10.8333 1.66669Z"
            stroke="#666666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8333 1.66669V7.50002H16.6666"
            stroke="#666666"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        alignSelf: "stretch",
        flexDirection: "column",
        padding: "0px 12px",
      }}
    >
      {menuItems.map((item, index) => (
        <ChatDetailInfoMenuItem key={index} text={item.text} icon={item.icon} />
      ))}
    </Box>
  );
};

export default ChatDetailInfoMenu;
