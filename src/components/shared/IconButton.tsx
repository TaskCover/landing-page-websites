import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  iconButtonClasses,
} from "@mui/material";
import Tooltip from "./Tooltip";
import { matchClass } from "./helpers";

const PRIMARY = "primary";
const EXTRA_SMALL = "extraSmall";
const NORMAL = "normal";

declare module "@mui/material/IconButton/IconButton" {
  interface IconButtonPropsSizeOverrides {
    [EXTRA_SMALL]: true;
    [NORMAL]: true;
  }
}

type CoreIconButtonProps = MuiIconButtonProps & {
  variant?: "contained" | "normal";
  noPadding?: boolean;
};

type IconButtonProps = CoreIconButtonProps & {
  tooltip?: string;
};

const IconButton = (props: IconButtonProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreIconButton {...rest} />
      </Tooltip>
    );
  }

  return <CoreIconButton {...rest} />;
};

const CoreIconButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreIconButtonProps, ref: ForwardedRef<any>) => {
    const { variant = "normal", sx, noPadding, ...rest } = props;

    const defaultSx = useMemo(() => {
      const initSx = noPadding
        ? { ...sxConfig.default, p: 0 }
        : sxConfig.default;
      if (variant === "normal") return initSx;
      return { ...initSx, ...sxConfig.contained };
    }, [variant, noPadding]);

    return <MuiIconButton ref={ref} sx={{ ...defaultSx, ...sx }} {...rest} />;
  },
);

CoreIconButton.displayName = "CoreIconButton";

export default memo(IconButton);

const PREFIX_BUTTON_CLASS = "MuiIconButton-";

const sxConfig = {
  default: {
    "& >*": {
      fontSize: "inherit",
    },
    // Size
    [`&.${iconButtonClasses.sizeLarge}`]: {
      fontSize: 28,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, NORMAL, "size")}`]: {
      fontSize: 24,
    },
    [`&.${iconButtonClasses.sizeMedium}`]: {
      fontSize: 20,
    },
    [`&.${iconButtonClasses.sizeSmall}`]: {
      fontSize: 16,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, EXTRA_SMALL, "size")}`]: {
      fontSize: 12,
    },
  },
  contained: {
    color: "common.white",
    backgroundColor: "primary.main",
    borderRadius: 1,
    "&:hover": {
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), #3699FF",
    },
    [`&.${iconButtonClasses.disabled}`]: {
      background:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #3699FF",
      color: "#F2F2F2",
    },
    [`&.${iconButtonClasses.sizeLarge}`]: {
      fontSize: 24,
      p: 2.5,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, NORMAL, "size")}`]: {
      fontSize: 24,
      p: 2,
    },
    [`&.${iconButtonClasses.sizeMedium}`]: {
      fontSize: 24,
      p: 1.5,
    },
    [`&.${iconButtonClasses.sizeSmall}`]: {
      fontSize: 16,
      p: 1,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, EXTRA_SMALL, "size")}`]: {
      fontSize: 16,
      p: 1,
    },
  },
};
