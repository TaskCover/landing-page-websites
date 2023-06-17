import { ForwardedRef, forwardRef, memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const CalendarIcon = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: SvgIconProps, ref: ForwardedRef<any>) => {
    return (
      <SvgIcon viewBox="0 0 24 24" fill="none" ref={ref} {...props}>
        <path
          d="M8 5.25C7.86614 5.25 7.75 5.13386 7.75 5V2C7.75 1.86614 7.86614 1.75 8 1.75C8.13386 1.75 8.25 1.86614 8.25 2V5C8.25 5.13386 8.13386 5.25 8 5.25Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path
          d="M16 5.25C15.8661 5.25 15.75 5.13386 15.75 5V2C15.75 1.86614 15.8661 1.75 16 1.75C16.1339 1.75 16.25 1.86614 16.25 2V5C16.25 5.13386 16.1339 5.25 16 5.25Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path
          d="M8.31231 13.9585L8.31238 13.9583L8.29949 13.9533C8.24695 13.9331 8.20146 13.9055 8.14035 13.8524C8.04864 13.7496 8 13.6255 8 13.5C8 13.4459 8.01285 13.3812 8.04154 13.3123C8.06614 13.2533 8.09993 13.1973 8.14509 13.1435C8.20384 13.0931 8.24832 13.0663 8.29949 13.0467L8.29956 13.0468L8.31231 13.0415C8.49002 12.9675 8.71948 13.011 8.85184 13.139C8.94682 13.2419 9 13.3784 9 13.5C9 13.5166 8.99673 13.5468 8.98624 13.6208C8.9848 13.6276 8.98136 13.6393 8.97278 13.6564L8.95689 13.6882L8.94566 13.7219C8.94151 13.7343 8.9327 13.7546 8.91398 13.7827L8.90738 13.7926L8.90526 13.7961C8.90299 13.799 8.89917 13.8037 8.8928 13.8112C8.88714 13.8178 8.88246 13.8232 8.87646 13.8301C8.87264 13.8345 8.86828 13.8396 8.86279 13.8459C8.8581 13.8514 8.85285 13.8575 8.84724 13.8641C8.74614 13.9514 8.61624 14 8.5 14C8.44582 14 8.38113 13.9872 8.31231 13.9585Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path
          d="M11.8123 13.9585L11.8124 13.9583L11.7995 13.9533C11.747 13.9331 11.7015 13.9055 11.6403 13.8524C11.5486 13.7495 11.5 13.6254 11.5 13.5C11.5 13.4458 11.5128 13.3812 11.5415 13.3123C11.5661 13.2533 11.5999 13.1973 11.6451 13.1435C11.7038 13.0931 11.7483 13.0663 11.7995 13.0467L11.8114 13.0421L11.8231 13.0369C11.9857 12.9646 12.2125 13.0039 12.3518 13.139C12.4468 13.2418 12.5 13.3784 12.5 13.5C12.5 13.5166 12.4967 13.5468 12.4862 13.6208C12.4848 13.6276 12.4814 13.6393 12.4728 13.6564L12.4569 13.6882L12.4457 13.7219C12.4415 13.7343 12.4327 13.7546 12.414 13.7826L12.4074 13.7925L12.4053 13.7961C12.403 13.799 12.3992 13.8036 12.3928 13.8111C12.3871 13.8178 12.3825 13.8232 12.3765 13.8301C12.3726 13.8345 12.3683 13.8395 12.3628 13.8459C12.3581 13.8514 12.3528 13.8575 12.3472 13.8641C12.2461 13.9514 12.1162 14 12 14C11.9458 14 11.8811 13.9871 11.8123 13.9585Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path
          d="M15.5 14.5C15.37 14.5 15.24 14.47 15.12 14.42C14.99 14.37 14.89 14.3 14.79 14.21C14.75 14.16 14.71 14.11 14.67 14.06C14.63 14 14.6 13.94 14.58 13.88C14.55 13.82 14.53 13.76 14.52 13.7C14.51 13.63 14.5 13.56 14.5 13.5C14.5 13.24 14.61 12.98 14.79 12.79C14.89 12.7 14.99 12.63 15.12 12.58C15.49 12.42 15.93 12.51 16.21 12.79C16.39 12.98 16.5 13.24 16.5 13.5C16.5 13.56 16.49 13.63 16.48 13.7C16.47 13.76 16.45 13.82 16.42 13.88C16.4 13.94 16.37 14 16.33 14.06C16.3 14.11 16.25 14.16 16.21 14.21C16.02 14.39 15.76 14.5 15.5 14.5Z"
          fill="currentColor"
        />
        <path
          d="M8.5 18C8.37 18 8.24 17.97 8.12 17.92C8 17.87 7.89 17.8 7.79 17.71C7.61 17.52 7.5 17.26 7.5 17C7.5 16.87 7.53 16.74 7.58 16.62C7.63 16.49 7.7 16.38 7.79 16.29C8.16 15.92 8.84 15.92 9.21 16.29C9.39 16.48 9.5 16.74 9.5 17C9.5 17.26 9.39 17.52 9.21 17.71C9.02 17.89 8.76 18 8.5 18Z"
          fill="currentColor"
        />
        <path
          d="M12 18C11.74 18 11.48 17.89 11.29 17.71C11.11 17.52 11 17.26 11 17C11 16.87 11.03 16.74 11.08 16.62C11.13 16.49 11.2 16.38 11.29 16.29C11.66 15.92 12.34 15.92 12.71 16.29C12.8 16.38 12.87 16.49 12.92 16.62C12.97 16.74 13 16.87 13 17C13 17.26 12.89 17.52 12.71 17.71C12.52 17.89 12.26 18 12 18Z"
          fill="currentColor"
        />
        <path
          d="M15.5 18C15.24 18 14.98 17.89 14.79 17.71C14.7 17.62 14.63 17.51 14.58 17.38C14.53 17.26 14.5 17.13 14.5 17C14.5 16.87 14.53 16.74 14.58 16.62C14.63 16.49 14.7 16.38 14.79 16.29C15.02 16.06 15.37 15.95 15.69 16.02C15.76 16.03 15.82 16.05 15.88 16.08C15.94 16.1 16 16.13 16.06 16.17C16.11 16.2 16.16 16.25 16.21 16.29C16.39 16.48 16.5 16.74 16.5 17C16.5 17.26 16.39 17.52 16.21 17.71C16.02 17.89 15.76 18 15.5 18Z"
          fill="currentColor"
        />
        <path
          d="M20.5 9.83997H3.5C3.09 9.83997 2.75 9.49997 2.75 9.08997C2.75 8.67997 3.09 8.33997 3.5 8.33997H20.5C20.91 8.33997 21.25 8.67997 21.25 9.08997C21.25 9.49997 20.91 9.83997 20.5 9.83997Z"
          fill="currentColor"
        />
        <path
          d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z"
          fill="currentColor"
        />
      </SvgIcon>
    );
  },
);

CalendarIcon.displayName = "CalendarIcon";

export default memo(CalendarIcon);
