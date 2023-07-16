import { memo } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const LinkIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4959_84389)">
        <path
          d="M12.4997 5.83398H14.9997C15.5468 5.83398 16.0887 5.94176 16.5942 6.15115C17.0997 6.36055 17.559 6.66746 17.946 7.05437C18.3329 7.44128 18.6398 7.90061 18.8492 8.40614C19.0586 8.91166 19.1663 9.45348 19.1663 10.0007C19.1663 10.5478 19.0586 11.0896 18.8492 11.5952C18.6398 12.1007 18.3329 12.56 17.946 12.9469C17.559 13.3338 17.0997 13.6408 16.5942 13.8501C16.0887 14.0595 15.5468 14.1673 14.9997 14.1673H12.4997M7.49967 14.1673H4.99967C4.4525 14.1673 3.91068 14.0595 3.40516 13.8501C2.89964 13.6408 2.44031 13.3338 2.0534 12.9469C1.27199 12.1655 0.833008 11.1057 0.833008 10.0007C0.833008 8.89558 1.27199 7.83577 2.0534 7.05437C2.8348 6.27297 3.89461 5.83398 4.99967 5.83398H7.49967"
          stroke="#666666"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66699 10H13.3337"
          stroke="#666666"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4959_84389">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default memo(LinkIcon);
