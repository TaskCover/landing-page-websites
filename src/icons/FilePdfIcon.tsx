import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const FilePdfIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      viewBox="0 0 19 22"
      fill="none"
      fontSize="inherit"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.75 0C4.09688 0 3.5625 0.61875 3.5625 1.375V20.625C3.5625 21.3813 4.09688 22 4.75 22H16.625C17.2781 22 17.8125 21.3813 17.8125 20.625V5.5L13.0625 0H4.75Z"
        fill="#E2E5E7"
      />
      <path
        d="M14.25 5.5H17.8125L13.0625 0V4.125C13.0625 4.88125 13.5969 5.5 14.25 5.5Z"
        fill="#B0B7BD"
      />
      <path
        d="M15.8334 17.6465C15.8334 18.0246 15.5662 18.334 15.2396 18.334H2.17712C1.85056 18.334 1.58337 18.0246 1.58337 17.6465V10.7715C1.58337 10.3934 1.85056 10.084 2.17712 10.084H15.2396C15.5662 10.084 15.8334 10.3934 15.8334 10.7715V17.6465Z"
        fill="#F96552"
      />

      <path
        d="M6.27148 13.1445C6.63997 13.1445 6.90885 13.224 7.07812 13.3828C7.2474 13.5404 7.33203 13.7578 7.33203 14.0352C7.33203 14.1602 7.31315 14.2799 7.27539 14.3945C7.23763 14.5078 7.17578 14.6087 7.08984 14.6973C7.00521 14.7858 6.89193 14.8561 6.75 14.9082C6.60807 14.959 6.43294 14.9844 6.22461 14.9844H5.96484V16H5.35938V13.1445H6.27148ZM6.24023 13.6406H5.96484V14.4883H6.16406C6.27734 14.4883 6.37565 14.4733 6.45898 14.4434C6.54232 14.4134 6.60677 14.3665 6.65234 14.3027C6.69792 14.2389 6.7207 14.1569 6.7207 14.0566C6.7207 13.916 6.68164 13.8118 6.60352 13.7441C6.52539 13.6751 6.4043 13.6406 6.24023 13.6406ZM10.2402 14.5449C10.2402 14.8665 10.1784 15.1354 10.0547 15.3516C9.93229 15.5664 9.75456 15.7285 9.52148 15.8379C9.28841 15.946 9.00781 16 8.67969 16H7.87109V13.1445H8.76758C9.06706 13.1445 9.32682 13.1979 9.54688 13.3047C9.76693 13.4102 9.9375 13.5671 10.0586 13.7754C10.1797 13.9824 10.2402 14.2389 10.2402 14.5449ZM9.61133 14.5605C9.61133 14.3496 9.58008 14.1764 9.51758 14.041C9.45638 13.9043 9.36523 13.8034 9.24414 13.7383C9.12435 13.6732 8.97591 13.6406 8.79883 13.6406H8.47656V15.5H8.73633C9.0319 15.5 9.2513 15.4212 9.39453 15.2637C9.53906 15.1061 9.61133 14.8717 9.61133 14.5605ZM11.4277 16H10.832V13.1445H12.4688V13.6406H11.4277V14.377H12.3965V14.8711H11.4277V16Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default memo(FilePdfIcon);