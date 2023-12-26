"use client";

import {
  memo,
  forwardRef,
  useEffect,
  useRef,
  useState,
  ForwardedRef,
} from "react";
import { Box, Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";

export type FixedLayoutProps = Omit<StackProps, "onSubmit"> & {
  children: React.ReactNode;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (event?: React.FormEvent<any> | undefined) => void | Promise<any>;
  hasCloseButton?: boolean;
  hasDialogClose?: boolean;
};

const FixedLayout = forwardRef(
  (props: FixedLayoutProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, order, ...rest } = props;
    const { breakpoints } = useTheme();
    const is1440Larger = useMediaQuery(breakpoints.up(1441));
    const [height, setHeight] = useState(0);
    const windowSize = useWindowSize();

    useEffect(() => {
      const heightt =
        window.innerHeight - ref?.current?.getBoundingClientRect().top - 5;
      setHeight(heightt);
    }, [windowSize]);

    return (
      <Stack width="100%" bgcolor={{ md: "background.default" }} order={order}>
        <Box
          ref={ref}
          sx={{
            height: `${height}px`,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: "16px",
          }}
        >
          <Stack
            // maxWidth={1349}
            // maxWidth={1349}
            mx="auto"
            width="100%"
            flex={is1440Larger ? undefined : 1}
            bgcolor={{ md: "background.paper" }}
            {...rest}
          >
            {children}
          </Stack>
        </Box>
      </Stack>
    );
  },
);
FixedLayout.displayName = "FixedLayout";

export default memo(FixedLayout);
