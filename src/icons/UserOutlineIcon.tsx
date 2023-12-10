import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const UserOutlineIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      fontSize="inherit"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.921 15.9961C7.66 15.9961 5.5 16.7281 5.5 18.1731C5.5 19.6311 7.66 20.3701 11.921 20.3701C16.181 20.3701 18.34 19.6381 18.34 18.1931C18.34 16.7351 16.181 15.9961 11.921 15.9961ZM11.921 21.8701C9.962 21.8701 4 21.8701 4 18.1731C4 14.8771 8.521 14.4961 11.921 14.4961C13.88 14.4961 19.84 14.4961 19.84 18.1931C19.84 21.4891 15.32 21.8701 11.921 21.8701Z"
        fill="currentcolor"
      />
      <path
        d="M11.9214 3.428C9.78038 3.428 8.03838 5.169 8.03838 7.31C8.03138 9.444 9.76038 11.184 11.8924 11.192L11.9214 11.906V11.192C14.0614 11.192 15.8024 9.45 15.8024 7.31C15.8024 5.169 14.0614 3.428 11.9214 3.428ZM11.9214 12.619H11.8894C8.96738 12.61 6.60038 10.227 6.61038 7.307C6.61038 4.382 8.99238 2 11.9214 2C14.8494 2 17.2304 4.382 17.2304 7.31C17.2304 10.238 14.8494 12.619 11.9214 12.619Z"
        fill="currentcolor"
      />
    </SvgIcon>
  );
};

export default memo(UserOutlineIcon);
