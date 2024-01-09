import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ImageImportIcon = (props: SvgIconProps) => {
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
        d="M19.1216 1.9043H22.4951L15.125 10.3278L23.7953 21.7903H17.0065L11.6893 14.8383L5.60524 21.7903H2.22972L10.1127 12.7804L1.79529 1.9043H8.7564L13.5627 8.25863L19.1216 1.9043ZM17.9376 19.7711H19.8069L7.74068 3.81743H5.73475L17.9376 19.7711Z"
        fill="#5C98F6"
      />
    </SvgIcon>
  );
};

export default memo(ImageImportIcon);
