import { memo, useMemo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import useTheme from "hooks/useTheme";

const MenuDocsIcon = (props: SvgIconProps) => {
  const { isDarkMode } = useTheme();

  const fill = useMemo(
    () => (isDarkMode ? "#FFFFFF" : "#212121"),
    [isDarkMode],
  );

  return (
    <SvgIcon
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 22.25H9C6.3424 22.25 4.56492 21.6803 3.4423 20.5577C2.31968 19.4351 1.75 17.6576 1.75 15V9C1.75 6.3424 2.31968 4.56492 3.4423 3.4423C4.56492 2.31968 6.3424 1.75 9 1.75H14C14.1339 1.75 14.25 1.86614 14.25 2C14.25 2.13386 14.1339 2.25 14 2.25H9C6.65972 2.25 4.92432 2.66107 3.7927 3.7927C2.66107 4.92432 2.25 6.65972 2.25 9V15C2.25 17.3403 2.66107 19.0757 3.7927 20.2073C4.92432 21.3389 6.65972 21.75 9 21.75H15C17.3403 21.75 19.0757 21.3389 20.2073 20.2073C21.3389 19.0757 21.75 17.3403 21.75 15V10C21.75 9.86614 21.8661 9.75 22 9.75C22.1339 9.75 22.25 9.86614 22.25 10V15C22.25 17.6576 21.6803 19.4351 20.5577 20.5577C19.4351 21.6803 17.6576 22.25 15 22.25Z"
        fill="#212121"
        stroke="#3699FF"
      />
      <path
        d="M13.8928 1.77585L13.8999 1.77306L13.907 1.77005C13.9871 1.73569 14.0949 1.74861 14.1815 1.82907L22.1764 9.82403C22.246 9.89355 22.2676 10.0067 22.2304 10.0935C22.1876 10.1934 22.096 10.2505 22 10.2505H18C16.3359 10.2505 15.315 9.92334 14.6961 9.30442C14.0771 8.68551 13.75 7.66458 13.75 6.00048V2.00048C13.75 1.89382 13.8153 1.80631 13.8928 1.77585ZM15.1036 3.45692L14.25 2.60337V3.81048V6.00048C14.25 7.29081 14.4062 8.29876 15.0539 8.94653C15.7017 9.5943 16.7097 9.75048 18 9.75048H20.19H21.3971L20.5436 8.89692L15.1036 3.45692Z"
        fill="#212121"
        stroke="#3699FF"
      />
      <path
        d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z"
        fill={fill}
      />
      <path
        d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z"
        fill={fill}
      />
    </SvgIcon>
  );
};

export default memo(MenuDocsIcon);
