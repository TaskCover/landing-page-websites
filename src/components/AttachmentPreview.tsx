import { Box, Stack } from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { IMAGES_ACCEPT, NS_COMMON } from "constant/index";
import { IconButton, Text, Tooltip } from "components/shared";
import CircleCloseIcon from "icons/CircleCloseIcon";
import PlayIcon from "icons/PlayIcon";
import { useTranslations } from "next-intl";
import FileIcon from "icons/FileIcon";
import Link from "./Link";

type AttachmentPreviewProps = {
  name: string;
  onRemove?: () => void;
  src: string;
  size?: number;
  showName?: boolean;
};

const AttachmentPreview = (props: AttachmentPreviewProps) => {
  const { name, onRemove, size = 64, showName, ...rest } = props;
  const ref = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const commonT = useTranslations(NS_COMMON);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const extension = useMemo(() => {
    const arr = name.split(".");
    return arr[arr.length - 1];
  }, [name]);

  const type = useMemo(() => {
    if (IMAGES_EXTENSION.includes(extension)) return `image/${extension}`;
    if (VIDEOS_EXTENSION.includes(extension)) return `video/${extension}`;
    return;
  }, [extension]);

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
    <Tooltip title={type ? commonT("clickToViewLarge") : ""}>
      <Stack direction="row" alignItems="center">
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

          {IMAGES_EXTENSION.includes(extension) ? (
            <Box
              component="img"
              {...previewProps}
              alt={name ?? "Image"}
              ref={ref}
              onClick={onEnterFullScreen}
              {...rest}
            />
          ) : VIDEOS_EXTENSION.includes(extension) ? (
            <>
              <PlayIcon
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "common.white",
                  fontSize: 24,
                  zIndex: 1,
                }}
                onClick={onEnterFullScreen}
              />
              <Box component="video" ref={ref} {...previewProps}>
                <source {...rest} type={type} />
              </Box>
            </>
          ) : (
            <Link
              href={props.src}
              download
              target="_blank"
              underline="none"
              color="inherit"
            >
              <FileIcon sx={{ fontSize: 50 }} />
            </Link>
          )}
        </Stack>
        {!!showName && (
          <Text variant="caption" maxWidth={69} noWrap>
            {name}
          </Text>
        )}
      </Stack>
    </Tooltip>
  );
};

export default memo(AttachmentPreview);

const IMAGES_EXTENSION = ["png", "jpeg", "jpg", "ico", "gif"];
const VIDEOS_EXTENSION = ["mp4", "mov", "wmv", "flv", "avi", "webm", "mkv"];
