import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowDownIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.292152 11.7128C-0.097384 11.3188 -0.097384 10.6822 0.292152 10.2872L9.53714 0.927512C10.0995 0.357496 11.0144 0.357496 11.5777 0.927512C12.14 1.49753 12.14 2.42265 11.5777 2.99267L3.66913 11.0005L11.5777 19.0063C12.14 19.5774 12.14 20.5025 11.5777 21.0725C11.0144 21.6425 10.0995 21.6425 9.53714 21.0725L0.292152 11.7128Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(ArrowDownIcon);
