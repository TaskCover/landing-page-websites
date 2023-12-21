import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const VideoCallIcon = (props: SvgIconProps) => {
  const color = "#FFFFFF";
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        fill={color}
      />
      <path
        d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z"
        fill={color}
      />
      <path
        d="M12 17.0009C11.87 17.0009 11.74 16.9709 11.62 16.9209C11.5 16.8709 11.39 16.8009 11.29 16.7109C11.2 16.6109 11.13 16.5109 11.08 16.3809C11.03 16.2609 11 16.1309 11 16.0009C11 15.8709 11.03 15.7409 11.08 15.6209C11.13 15.5009 11.2 15.3909 11.29 15.2909C11.39 15.2009 11.5 15.1309 11.62 15.0809C11.86 14.9809 12.14 14.9809 12.38 15.0809C12.5 15.1309 12.61 15.2009 12.71 15.2909C12.8 15.3909 12.87 15.5009 12.92 15.6209C12.97 15.7409 13 15.8709 13 16.0009C13 16.1309 12.97 16.2609 12.92 16.3809C12.87 16.5109 12.8 16.6109 12.71 16.7109C12.61 16.8009 12.5 16.8709 12.38 16.9209C12.26 16.9709 12.13 17.0009 12 17.0009Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default memo(VideoCallIcon);