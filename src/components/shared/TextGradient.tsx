import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { Breakpoint, Typography, TypographyProps } from "@mui/material";
import Tooltip from "./Tooltip";
import { Variant } from "@mui/material/styles/createTypography";
import useBreakpoint from "hooks/useBreakpoint";

type CoreTextProps = Omit<TypographyProps, "variant"> & {
  // variant?: Variant | { [key in Breakpoint]: Variant };
  variant?: Variant | { [key: string]: Variant } | "inherit";
  component?: string;
  percentBlueColor?: number;
  percentGreenColor?: number;
  degGradient?: number;
};

export type TextProps = CoreTextProps & {
  tooltip?: string;
};

const TextGradient = (props: TextProps) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreText {...rest} />
      </Tooltip>
    );
  }

  return <CoreText {...rest} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CoreText = forwardRef((props: CoreTextProps, ref: ForwardedRef<any>) => {
  const {
    variant: variantProps = "body1",
    children,
    percentBlueColor = 5.8,
    percentGreenColor = 38.38,
    degGradient = 360,
    ...rest
  } = props;
  const { breakpoint } = useBreakpoint();

  const variant = useMemo(() => {
    if (typeof variantProps === "object") {
      if (breakpoint) {
        return getActiveBreakpoint(breakpoint, variantProps) ?? "body1";
      }
      return variantProps[Object.keys(variantProps)[0]];
    }
    return variantProps ?? "body1";
  }, [variantProps, breakpoint]) as Variant | "inherit";

  return (
    <Typography
      ref={ref}
      variant={variant}
      sx={{
        background: `-webkit-linear-gradient(${degGradient}deg,#0575E6 ${percentBlueColor}%, #38E27B ${percentGreenColor}%)`,
        backgroundClip: "text",
        textFillColor: "transparent",
        backgroundColor: "transparent",
        ...rest.sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
});

CoreText.displayName = "CoreText";

export default memo(TextGradient);

const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string },
) => {
  switch (currentRatio) {
    case "xl":
      return (
        options["xl"] ??
        options["lg"] ??
        options["md"] ??
        options["sm"] ??
        options["xs"]
      );
    case "lg":
      return options["lg"] ?? options["md"] ?? options["sm"] ?? options["xs"];
    case "md":
      return options["md"] ?? options["sm"] ?? options["xs"];
    case "sm":
      return options["sm"] ?? options["xs"];
    case "xs":
      return options["xs"];
    default:
      return;
  }
};
