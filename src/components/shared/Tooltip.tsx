import { memo } from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";

const Tooltip = (props: TooltipProps) => {
  const { children, sx, ...rest } = props;

  return (
    <MuiTooltip
      placement="top"
      arrow
      TransitionComponent={Zoom}
      PopperProps={{
        sx: {
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "grey.900",
            fontSize: 12,
            lineHeight: 1.25,
            color: "grey.A200",
            px: 1.5,
            py: 0.75,
            borderRadius: 0.5,
            ...sx,
          },
          [`& .${tooltipClasses.arrow}`]: {
            color: "grey.900",
          },
        },
      }}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default memo(Tooltip);
