import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.60014 16C9.60014 15.0667 9.96014 14.1334 10.6668 13.4267L19.3601 4.73336C19.7468 4.34669 20.3868 4.34669 20.7735 4.73336C21.1601 5.12003 21.1601 5.76003 20.7735 6.14669L12.0801 14.84C11.4401 15.48 11.4401 16.52 12.0801 17.16L20.7735 25.8534C21.1601 26.24 21.1601 26.88 20.7735 27.2667C20.3868 27.6534 19.7468 27.6534 19.3601 27.2667L10.6668 18.5734C9.96014 17.8667 9.60014 16.9334 9.60014 16Z"
        fill="#212121"
      />
    </SvgIcon>
  );
};

export default memo(ArrowDownIcon);
