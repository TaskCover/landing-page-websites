import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const GroupNameIcon = (props: SvgIconProps) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0999 10.6497C10.0416 10.6414 9.9666 10.6414 9.89994 10.6497C8.43327 10.5997 7.2666 9.39974 7.2666 7.92474C7.2666 6.41641 8.48327 5.19141 9.99993 5.19141C11.5083 5.19141 12.7333 6.41641 12.7333 7.92474C12.7249 9.39974 11.5666 10.5997 10.0999 10.6497Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15.6166 16.1508C14.1333 17.5091 12.1666 18.3341 9.99997 18.3341C7.8333 18.3341 5.86663 17.5091 4.3833 16.1508C4.46663 15.3674 4.96663 14.6008 5.8583 14.0008C8.14163 12.4841 11.875 12.4841 14.1416 14.0008C15.0333 14.6008 15.5333 15.3674 15.6166 16.1508Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.0001 18.3327C14.6025 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 5.39698 14.6025 1.66602 10.0001 1.66602C5.39771 1.66602 1.66675 5.39698 1.66675 9.99935C1.66675 14.6017 5.39771 18.3327 10.0001 18.3327Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};

export default memo(GroupNameIcon);

