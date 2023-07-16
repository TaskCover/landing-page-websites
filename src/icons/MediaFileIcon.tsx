import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const MediaFileIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5003 12.5007L13.3337 8.33398L4.16699 17.5007"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.08301 8.33398C7.77336 8.33398 8.33301 7.77434 8.33301 7.08398C8.33301 6.39363 7.77336 5.83398 7.08301 5.83398C6.39265 5.83398 5.83301 6.39363 5.83301 7.08398C5.83301 7.77434 6.39265 8.33398 7.08301 8.33398Z"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(MediaFileIcon);
