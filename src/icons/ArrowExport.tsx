import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowExport = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.16666 7.33385L14.6333 1.86719"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.1667 4.53398V1.33398H11.9667"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.83334 1.33398H6.5C3.16667 1.33398 1.83334 2.66732 1.83334 6.00065V10.0007C1.83334 13.334 3.16667 14.6673 6.5 14.6673H10.5C13.8333 14.6673 15.1667 13.334 15.1667 10.0007V8.66732"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default memo(ArrowExport);
