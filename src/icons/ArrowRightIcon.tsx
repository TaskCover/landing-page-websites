import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="32"
      height="32"
      viewBox="-6 -4 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.90998 20.67C8.71998 20.67 8.52998 20.6 8.37998 20.45C8.08998 20.16 8.08998 19.68 8.37998 19.39L14.9 12.87C15.38 12.39 15.38 11.61 14.9 11.13L8.37998 4.61002C8.08998 4.32002 8.08998 3.84002 8.37998 3.55002C8.66998 3.26002 9.14998 3.26002 9.43998 3.55002L15.96 10.07C16.47 10.58 16.76 11.27 16.76 12C16.76 12.73 16.48 13.42 15.96 13.93L9.43998 20.45C9.28998 20.59 9.09998 20.67 8.90998 20.67Z" fill="#292D32" />
    </SvgIcon>
  );
};

export default memo(ArrowRightIcon);

