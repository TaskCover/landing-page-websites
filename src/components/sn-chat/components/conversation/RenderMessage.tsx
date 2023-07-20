import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import Preview from "components/Preview";
import PlayIcon from "icons/PlayIcon";
import { useRef, useState } from "react";
import { Attachment } from "store/chat/media/typeMedia";
import { MessageInfo } from "store/chat/type";
import { formatDate } from "utils/index";

const RenderAttachment = ({
  message,
  attachmentProps,
}: {
  message: MessageInfo;
  attachmentProps?: BoxProps;
}) => {
  const { sx, ...props } = attachmentProps || {};
  const groupAttachment = (
    attachments: Attachment[],
    keys: string | string[],
  ) => {
    return attachments?.reduce((result, current) => {
      if (typeof keys === "string") {
        current[keys] &&
          (result[keys] = result[keys] || []).push(current[keys]);
      } else {
        for (const key of keys) {
          current[key] && (result[key] = result[key] || []).push(current[key]);
        }
      }
      return result;
    }, {});
  };

  const ref = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  const [mediaPreview, setMediaPreview] = useState<{
    isPreview;
    src: string;
    type: "image_url" | "video_url";
  }>({ isPreview: false, src: "", type: "image_url" });

  const media = groupAttachment(message?.attachments, [
    "image_url",
    "video_url",
  ]) as unknown as { image_url: string[]; video_url: string[] };
  return (
    <>
      {media && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "0.2rem",
            maxWidth: "232px",
            ...sx,
          }}
          {...props}
        >
          {media?.image_url?.map((image, index) => {
            return (
              <Box position="relative" key={index}>
                <Avatar
                  size={112}
                  src={image || undefined}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #efefef",
                    objectFit: "cover",
                  }}
                  onClick={() =>
                    setMediaPreview((state) => ({
                      ...state,
                      isPreview: true,
                      src: image,
                      type: "image_url",
                    }))
                  }
                />
                <Typography
                  variant="caption"
                  color="#999999"
                  position="absolute"
                  bottom=".8rem"
                  right=".7rem"
                >
                  {formatDate(message.ts, "HH:mm")}
                </Typography>
              </Box>
            );
          })}
          {media?.video_url?.map((url, index) => {
            return (
              <Box position="relative" key={index}>
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
                    onClick={() =>
                      setMediaPreview((state) => ({
                        ...state,
                        isPreview: true,
                        src: url,
                        type: "video_url",
                      }))
                    }
                  />
                  <Box component="video" ref={ref} width={112} height={112}>
                    <source src={url} />
                  </Box>
                </>
                <Typography
                  variant="caption"
                  color="#999999"
                  position="absolute"
                  bottom=".8rem"
                  right=".7rem"
                >
                  {formatDate(message.ts, "HH:mm")}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
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

export default RenderAttachment;
