import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  buttonClasses,
} from "@mui/material";
import { matchClass } from "./helpers";
import Tooltip from "./Tooltip";

const PRIMARY = "primary";
const PRIMARY_OUTLINED = "primaryOutlined";
const SECONDARY = "secondary";
const EXTRA_SMALL = "extraSmall";
const NORMAL = "normal";

declare module "@mui/material/Button/Button" {
  interface ButtonPropsVariantOverrides {
    [PRIMARY]: true;
    [SECONDARY]: true;
    [PRIMARY_OUTLINED]: true;
  }
  interface ButtonPropsSizeOverrides {
    [EXTRA_SMALL]: true;
    [NORMAL]: true;
  }
}

type CoreButtonProps = MuiButtonProps & {
  pending?: boolean;
};
type ButtonProps = CoreButtonProps & {
  tooltip?: string;
};

const Button = (props: ButtonProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreButton {...rest} />
      </Tooltip>
    );
  }

  return <CoreButton {...rest} />;
};

const CoreButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreButtonProps, ref: ForwardedRef<any>) => {
    const { sx, pending, startIcon: startIconProps, ...rest } = props;

    const startIcon = useMemo(
      () =>
        pending ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          startIconProps
        ),
      [pending, startIconProps],
    );

    return (
      <MuiButton
        ref={ref}
        startIcon={startIcon}
        sx={{ ...defaultSx, ...sx } as CoreButtonProps["sx"]}
        {...rest}
      />
    );
  },
);

CoreButton.displayName = "CoreButton";

export default memo(Button);

const PREFIX_BUTTON_CLASS = "MuiButton-";

const defaultSx = {
  fontWeight: 600,
  borderRadius: 1,
  minWidth: "fit-content",
  color: "common.white",
  textTransform: "initial",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "inline-block",

  [`&.${buttonClasses.fullWidth}`]: {
    width: "100%",
  },

  [`& .${buttonClasses.startIcon}, & .${buttonClasses.endIcon}`]: {
    display: "inline-block",
    verticalAlign: "middle",
    "&>*": {
      pt: 0.25,
    },
  },

  [`&.${buttonClasses.disabled}`]: {
    color: "#F2F2F2",
  },

  [`&.${matchClass(PREFIX_BUTTON_CLASS, PRIMARY)}`]: {
    backgroundColor: "primary.main",
    "&:hover": {
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), #3699FF",
    },
    [`&.${buttonClasses.disabled}`]: {
      background:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), #3699FF",
    },
  },
  [`&.${matchClass(PREFIX_BUTTON_CLASS, PRIMARY_OUTLINED)}`]: {
    border: "1px solid",
    backgroundColor: "transparent",
    borderColor: "primary.main",
    color: "primary.main",
    "&:hover": {
      borderColor: "primary.dark",
      color: "primary.dark",
    },
    [`&.${buttonClasses.disabled}`]: {
      borderColor: "primary.light",
      color: "primary.light",
    },
  },

  [`&.${matchClass(PREFIX_BUTTON_CLASS, SECONDARY)}`]: {
    backgroundColor: "primary.light",
    color: "primary.main",

    "&:hover": {
      color: "primary.dark",
      backgroundColor: "primary.light",
    },
    [`&.${buttonClasses.disabled}`]: {
      opacity: 0.6,
    },
  },

  // Size
  [`&.${buttonClasses.sizeLarge}`]: {
    py: 2.5,
    px: 4,
    fontSize: 20,
    lineHeight: 1.2,
  },
  [`&.${matchClass(PREFIX_BUTTON_CLASS, NORMAL, "size")}`]: {
    py: 2,
    px: 4,
    fontSize: 20,
    lineHeight: 1.2,
  },
  [`&.${buttonClasses.sizeMedium}`]: {
    py: 1.75,
    px: 4,
    fontSize: 16,
    lineHeight: 1.25,
  },
  [`&.${buttonClasses.sizeSmall}`]: {
    py: 1.5,
    px: 3,
    fontSize: 14,
    lineHeight: 1.14,
  },
  [`&.${matchClass(PREFIX_BUTTON_CLASS, EXTRA_SMALL, "size")}`]: {
    py: 1,
    px: 3,
    fontSize: 14,
    lineHeight: 1.14,
  },
};
