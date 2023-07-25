import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  buttonClasses,
} from "@mui/material";
import { matchClass } from "./helpers";
import Tooltip from "./Tooltip";
import useTheme from "hooks/useTheme";

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
    const { sx, pending, startIcon: startIconProps, variant, ...rest } = props;

    const { isDarkMode } = useTheme();

    const startIcon = useMemo(
      () =>
        pending ? (
          <CircularProgress
            size={20}
            sx={{ color: variant === "primary" ? "common.white" : "primary" }}
          />
        ) : (
          startIconProps
        ),
      [pending, startIconProps, variant],
    );

    const defaultSx = useMemo(
      () => getDefaultSx(isDarkMode, sx),
      [isDarkMode, sx],
    );

    return (
      <MuiButton
        ref={ref}
        startIcon={startIcon}
        variant={variant}
        sx={{ ...defaultSx, ...sx } as CoreButtonProps["sx"]}
        {...rest}
      />
    );
  },
);

CoreButton.displayName = "CoreButton";

export default memo(Button);

const PREFIX_BUTTON_CLASS = "MuiButton-";

const getDefaultSx = (isDarkMode: boolean, sx) => {
  return {
    fontWeight: 600,
    borderRadius: 1,
    minWidth: "fit-content",
    color: "common.white",
    textTransform: "initial",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",

    [`&.${buttonClasses.fullWidth}`]: {
      width: "100%",
    },

    [`& .${buttonClasses.startIcon}, & .${buttonClasses.endIcon}`]: {
      display: "inline-block",
      verticalAlign: "middle",
      "&>*:nth-of-type(1)": {
        fontSize: "1.125rem",
      },
      "&>*": {
        pt: 0.25,
      },
    },

    [`&.${buttonClasses.disabled}`]: {
      color: "#F2F2F2",
    },

    [`&.${buttonClasses.textSecondary}`]: {
      backgroundColor: "transparent",
      width: "fit-content",
      color: "success.main",
      p: "0!important",
      [`&.${buttonClasses.focusVisible}`]: {
        backgroundColor: "transparent",
      },
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
        borderColor: isDarkMode ? "grey.50" : "primary.light",
        color: isDarkMode ? "grey.50" : "primary.light",
      },
    },

    [`&.${matchClass(PREFIX_BUTTON_CLASS, SECONDARY)}`]: {
      backgroundColor: isDarkMode ? "grey.50" : "primary.light",
      color: "primary.main",

      "&:hover": {
        color: "common.white",
        backgroundColor: "primary.main",
        "&:svg": {
          color: "common.white",
        },
      },
      [`&.${buttonClasses.disabled}`]: {
        opacity: 0.6,
      },
    },

    // Size
    [`&.${buttonClasses.sizeLarge}`]: {
      // py: 2.5,
      px: 4,
      fontSize: 20,
      lineHeight: 1.2,
      minHeight: 64,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, NORMAL, "size")}`]: {
      // py: 2,
      px: 4,
      fontSize: 20,
      lineHeight: 1.2,
      minHeight: 56,
    },
    [`&.${buttonClasses.sizeMedium}`]: {
      // py: 1.75,
      px: 4,
      fontSize: 16,
      lineHeight: 1.25,
      minHeight: 48,
    },
    [`&.${buttonClasses.sizeSmall}`]: {
      // py: 1.5,
      px: 3,
      fontSize: 14,
      lineHeight: 1.14,
      minHeight: 40,
      ...sx,
    },
    [`&.${matchClass(PREFIX_BUTTON_CLASS, EXTRA_SMALL, "size")}`]: {
      // py: 1,
      px: 3,
      fontSize: 14,
      lineHeight: 1.14,
      minHeight: 32,
    },
  };
};
