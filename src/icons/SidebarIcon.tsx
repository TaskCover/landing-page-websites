import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const SidebarIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 24 24"
            fill="none"
            fontSize="inherit"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M14.97 22.75H8.96997C3.53997 22.75 1.21997 20.43 1.21997 15V9C1.21997 3.57 3.53997 1.25 8.96997 1.25H14.97C20.4 1.25 22.72 3.57 22.72 9V15C22.72 20.43 20.41 22.75 14.97 22.75ZM8.96997 2.75C4.35997 2.75 2.71997 4.39 2.71997 9V15C2.71997 19.61 4.35997 21.25 8.96997 21.25H14.97C19.58 21.25 21.22 19.61 21.22 15V9C21.22 4.39 19.58 2.75 14.97 2.75H8.96997Z" fill="#1BC5BD" />
            <path d="M14.97 22.75C14.56 22.75 14.22 22.41 14.22 22V2C14.22 1.59 14.56 1.25 14.97 1.25C15.38 1.25 15.72 1.59 15.72 2V22C15.72 22.41 15.39 22.75 14.97 22.75Z" fill="#1BC5BD" />
            <path d="M7.96991 15.31C7.77991 15.31 7.58991 15.24 7.43991 15.09C7.14991 14.8 7.14991 14.32 7.43991 14.03L9.46991 12L7.43991 9.97001C7.14991 9.68001 7.14991 9.2 7.43991 8.91C7.72991 8.62 8.20991 8.62 8.49991 8.91L11.0599 11.47C11.3499 11.76 11.3499 12.24 11.0599 12.53L8.49991 15.09C8.35991 15.24 8.16991 15.31 7.96991 15.31Z" fill="#1BC5BD" />
        </SvgIcon>
    );
};

export default memo(SidebarIcon);
