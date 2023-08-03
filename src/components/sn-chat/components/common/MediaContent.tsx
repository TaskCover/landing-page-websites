import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Media from "components/Media";
import Preview from "components/Preview";
import { DataStatus } from "constant/enums";
import { AN_ERROR_TRY_AGAIN, NS_COMMON } from "constant/index";
import PlayIcon from "icons/PlayIcon";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSnackbar } from "store/app/selectors";
import { useChat } from "store/chat/selectors";

export type MediaType = "image_url" | "video_url";
export const MediaClone = ({ src, type }: { src: string; type: MediaType }) => {
  const ref = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const [isError, setError] = useState<boolean>(false);
  const [mediaPreview, setMediaPreview] = useState<{
    isPreview;
    src: string;
    type: MediaType;
  }>({ isPreview: false, src: "", type: "image_url" });
  const switchMedia = useMemo(() => {
    switch (type) {
      case "image_url": {
        return !isError ? (
          <Media
            size={92}
            src={src}
            loading="lazy"
            style={{
              display: isError ? "none" : "block",
              width: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              setError(true);
            }}
            onClick={() =>
              setMediaPreview((state) => ({
                ...state,
                isPreview: true,
                src: src,
                type: type,
              }))
            }
          />
        ) : (
          <Skeleton
            variant="rounded"
            style={{
              width: "100%",
              height: "92px",
            }}
          />
        );
      }
      case "video_url": {
        return (
          <Box
            sx={{
              width: "100%",
              height: "92px",
              position: "relative",
            }}
          >
            <PlayIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "common.white",
                cursor: "pointer",
                fontSize: 24,
                zIndex: 1,
              }}
              onClick={() =>
                setMediaPreview((state) => ({
                  ...state,
                  isPreview: true,
                  src: src,
                  type: "video_url",
                }))
              }
            />
            {!isError ? (
              <Box component="video" ref={ref} width={92} height={92}>
                <source src={src} onError={() => setError(true)} />
              </Box>
            ) : (
              <Skeleton
                variant="rounded"
                style={{
                  width: "92px",
                  height: "92px",
                }}
              />
            )}
          </Box>
        );
      }
      default:
        return (
          <Skeleton
            variant="rounded"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        );
    }
  }, [isError, src, type]);

  return (
    <>
      {switchMedia}
      {Boolean(
        mediaPreview?.isPreview && mediaPreview?.src && mediaPreview?.type,
      ) && (
        <Preview
          open={true}
          type={mediaPreview.type || ""}
          onClose={() =>
            setMediaPreview((state) => ({ ...state, isPreview: false }))
          }
          src={mediaPreview.src as string}
        />
      )}
    </>
  );
};

const MediaContent = () => {
  const { mediaList, mediaListStatus, onGetChatAttachments } = useChat();
  const { onAddSnackbar } = useSnackbar();
  const t = useTranslations(NS_COMMON);

  useEffect(() => {
    const handleGetAttachment = async () => {
      try {
        await onGetChatAttachments({ fileType: "media" });
      } catch (error) {
        onAddSnackbar(
          typeof error === "string" ? error : t(AN_ERROR_TRY_AGAIN),
          "error",
        );
      }
    };
    handleGetAttachment();
  }, [onAddSnackbar, onGetChatAttachments, t]);

  const mediaClone = useMemo(() => {
    return mediaList
      ?.filter((file) => file.url)
      .map((item) => {
        if (item.url.indexOf("mp4") > -1) {
          return { ...item, type: "video_url" as MediaType };
        } else {
          return { ...item, type: "image_url" as MediaType };
        }
      });
  }, [mediaList]);

  return (
    <>
      {mediaListStatus === DataStatus.LOADING ||
      mediaListStatus === DataStatus.FAILED ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "4px",
            overflow: "auto",
            maxHeight: "calc(600px - 73px - 37px - 35px)",
          }}
        >
          {mediaClone?.map((item, index) => (
            <MediaClone key={index} src={item.url} type={item.type} />
          ))}
        </Box>
      )}
    </>
  );
};

export default MediaContent;
