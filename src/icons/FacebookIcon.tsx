import { SvgIconProps } from "@mui/material";
import { SvgIcon } from "components/shared";
import React from "react";

const LockIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_2318_8800)">
        <path
          d="M24.7953 12C24.7953 5.37258 19.4227 0 12.7953 0C6.16787 0 0.795288 5.37258 0.795288 12C0.795288 17.9895 5.18349 22.954 10.9203 23.8542V15.4688H7.87341V12H10.9203V9.35625C10.9203 6.34875 12.7119 4.6875 15.4529 4.6875C16.7654 4.6875 18.139 4.92188 18.139 4.92188V7.875H16.6259C15.1353 7.875 14.6703 8.80008 14.6703 9.75V12H17.9984L17.4664 15.4688H14.6703V23.8542C20.4071 22.954 24.7953 17.9895 24.7953 12Z"
          fill="#5C98F6"
        />
      </g>
      <defs>
        <clipPath id="clip0_2318_8800">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.795288)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default LockIcon;
