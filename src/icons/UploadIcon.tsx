import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const UploadIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 24 24"
      fill="none"
      fontSize="inherit"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9999 8.74999C11.5899 8.74999 11.2499 8.40999 11.2499 7.99999V3.80999L10.5299 4.52999C10.2399 4.81999 9.75994 4.81999 9.46994 4.52999C9.17994 4.23999 9.17994 3.75999 9.46994 3.46999L11.4699 1.46999C11.6799 1.25999 12.0099 1.18999 12.2899 1.30999C12.5699 1.41999 12.7499 1.69999 12.7499 1.99999V7.99999C12.7499 8.40999 12.4099 8.74999 11.9999 8.74999Z"
        fill="currentColor"
      />
      <path
        d="M13.9999 4.74994C13.8099 4.74994 13.6199 4.67994 13.4699 4.52994L11.4699 2.52994C11.1799 2.23994 11.1799 1.75994 11.4699 1.46994C11.7599 1.17994 12.2399 1.17994 12.5299 1.46994L14.5299 3.46994C14.8199 3.75994 14.8199 4.23994 14.5299 4.52994C14.3799 4.67994 14.1899 4.74994 13.9999 4.74994Z"
        fill="currentColor"
      />
      <path
        d="M16 22.75H8C2.25 22.75 2.25 19.7 2.25 17V16C2.25 13.77 2.25 11.25 7 11.25C8.19 11.25 8.63 11.54 9.25 12C9.28 12.03 9.32 12.05 9.35 12.09L10.37 13.17C11.23 14.08 12.79 14.08 13.65 13.17L14.67 12.09C14.7 12.06 14.73 12.03 14.77 12C15.39 11.53 15.83 11.25 17.02 11.25C21.77 11.25 21.77 13.77 21.77 16V17C21.75 20.82 19.82 22.75 16 22.75ZM7 12.75C3.75 12.75 3.75 13.77 3.75 16V17C3.75 19.74 3.75 21.25 8 21.25H16C18.98 21.25 20.25 19.98 20.25 17V16C20.25 13.77 20.25 12.75 17 12.75C16.28 12.75 16.13 12.84 15.7 13.16L14.73 14.19C14.01 14.95 13.04 15.37 12 15.37C10.96 15.37 9.99 14.95 9.27 14.19L8.3 13.16C7.87 12.84 7.72 12.75 7 12.75Z"
        fill="currentColor"
      />
      <path
        d="M5 12.75C4.59 12.75 4.25 12.41 4.25 12V9.99997C4.25 8.05997 4.25 5.64997 7.93 5.29997C8.33 5.24997 8.71 5.55997 8.75 5.97997C8.79 6.38997 8.49 6.75997 8.07 6.79997C5.75 7.00997 5.75 7.94997 5.75 9.99997V12C5.75 12.41 5.41 12.75 5 12.75Z"
        fill="currentColor"
      />
      <path
        d="M18.9999 12.75C18.5899 12.75 18.2499 12.41 18.2499 12V9.99998C18.2499 7.94998 18.2499 7.00998 15.9299 6.78998C15.5199 6.74998 15.2199 6.37998 15.2599 5.96998C15.2999 5.55998 15.6599 5.24998 16.0799 5.29998C19.7599 5.64998 19.7599 8.05998 19.7599 9.99998V12C19.7499 12.41 19.4099 12.75 18.9999 12.75Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default memo(UploadIcon);
