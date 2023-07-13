import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowRightIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      fontSize="inherit"
      strokeWidth={1.5}
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 9.99974C14 10.5831 13.775 11.1664 13.3334 11.6081L7.90003 17.0414C7.65837 17.2831 7.25837 17.2831 7.0167 17.0414C6.77503 16.7997 6.77503 16.3997 7.0167 16.1581L12.45 10.7247C12.85 10.3247 12.85 9.67474 12.45 9.27474L7.0167 3.84141C6.77503 3.59974 6.77503 3.19974 7.0167 2.95807C7.25837 2.71641 7.65836 2.71641 7.90003 2.95807L13.3334 8.39141C13.775 8.83307 14 9.41641 14 9.99974Z" fill="#999999" />
    </SvgIcon>
  );
};

export default memo(ArrowRightIcon);
