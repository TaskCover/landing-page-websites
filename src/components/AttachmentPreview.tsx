import { Box, Stack } from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { IMAGES_ACCEPT, NS_COMMON } from "constant/index";
import { IconButton, Tooltip } from "components/shared";
import CircleCloseIcon from "icons/CircleCloseIcon";
import PlayIcon from "icons/PlayIcon";
import { useTranslations } from "next-intl";

type AttachmentPreviewProps = {
  name: string;
  onRemove?: () => void;
  src: string;
  size?: number;
};

const AttachmentPreview = (props: AttachmentPreviewProps) => {
  const { name, onRemove, size = 64, ...rest } = props;
  const ref = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const commonT = useTranslations(NS_COMMON);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const type = useMemo(() => {
    const arr = name.split(".");
    const extension = arr[arr.length - 1];

    if (IMAGES_EXTENSION.includes(extension)) return `image/${extension}`;
    return `video/${extension}`;
  }, [name]);

  const previewProps = useMemo(
    () => ({
      width: onRemove ? size - 20 : size,
      height: onRemove ? size - 20 : size,
      sx: {
        objectFit: isFullScreen ? "contain" : "cover",
        borderRadius: 1,
      },
    }),
    [isFullScreen, onRemove, size],
  );

  const onEnterFullScreen = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = ref?.current as any;
    if (!element) return;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  };

  useEffect(() => {
    if (!ref?.current) return;
    ref.current.addEventListener("fullscreenchange", (event) => {
      setIsFullScreen(!!document.fullscreenElement);
      if ((ref.current as HTMLVideoElement)?.pause) {
        (ref.current as HTMLVideoElement).pause();
        (ref.current as HTMLVideoElement).load();
      }
    });
  }, []);

  return (
    <Tooltip title={commonT("clickToViewLarge")}>
      <Stack
        alignItems="center"
        justifyContent="center"
        width={size}
        height={size}
        borderRadius={1}
        overflow="hidden"
        position="relative"
        p={onRemove ? 1.25 : 0}
        sx={{
          cursor: "pointer",
        }}
      >
        {!!onRemove && (
          <IconButton
            noPadding
            onClick={onRemove}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper",
              },
              zIndex: 20,
            }}
          >
            <CircleCloseIcon sx={{ color: "grey.400", fontSize: 20 }} />
          </IconButton>
        )}
        {IMAGES_ACCEPT.includes(type) ? (
          <Box
            component="img"
            {...previewProps}
            alt={name ?? "Image"}
            ref={ref}
            onClick={onEnterFullScreen}
            {...rest}
          />
        ) : (
          <>
            <PlayIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "common.white",
                fontSize: 24,
              }}
              onClick={onEnterFullScreen}
            />
            <Box component="video" ref={ref} {...previewProps}>
              <source {...rest} type={type} />
            </Box>
          </>
        )}
      </Stack>
    </Tooltip>
  );
};

export default memo(AttachmentPreview);

const IMAGES_EXTENSION = ["png", "jpeg", "jpg"];
