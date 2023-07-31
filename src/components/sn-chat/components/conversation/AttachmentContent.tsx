import Box, { BoxProps } from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Avatar from "components/Avatar";
import Link from "components/Link";
import Preview from "components/Preview";
import { FILE_MAP } from "constant/enums";
import { mapType } from "constant/index";
import FileCsvIcon from "icons/FileCsvIcon";
import FileDocIcon from "icons/FileDocIcon";
import FileExcelIcon from "icons/FileExcelIcon";
import FilePdfIcon from "icons/FilePdfIcon";
import PlayIcon from "icons/PlayIcon";
import { useMemo, useRef, useState } from "react";
import { Attachment } from "store/chat/media/typeMedia";
import { MessageInfo } from "store/chat/type";
import { TimeMessage } from "../messages/MessageContent";

const IconFile = {
  [FILE_MAP.DOC]: FileDocIcon,
  [FILE_MAP.EXCEL]: FileExcelIcon,
  [FILE_MAP.PDF]: FilePdfIcon,
  [FILE_MAP.CSV]: FileCsvIcon,
};

const AttachmentContent = ({
  message,
  isCurrentUser,
  isRead,
  attachmentProps,
}: {
  message: MessageInfo;
  isCurrentUser: boolean;
  isRead: boolean;
  attachmentProps?: BoxProps;
}) => {
  const { sx, ...props } = attachmentProps || {};

  const styleForFile = (title: string) => {
    const type = title?.split(".")[1];
    for (const [key, value] of Object.entries(mapType)) {
      if (value.includes(type)) return IconFile[key];
    }
  };
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

  const files = useMemo(() => {
    return message?.attachments
      .filter((att) => att.title_link)
      .map((item) => {
        if (item?.title_link) {
          return {
            title: item.title,
            title_link: item.title_link,
            title_link_download: item.title_link_download,
          };
        }
      });
  }, [message]);
  return (
    <>
      {
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
          {media &&
            media?.image_url?.map((image, index) => {
              return (
                <Box position="relative" key={index}>
                  <Avatar
                    size={112}
                    src={image || undefined}
                    style={{
                      borderRadius: "20px",
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
                  <TimeMessage
                    time={message.ts}
                    isRead={isRead}
                    isCurrentUser={isCurrentUser}
                    timeMessageProps={{
                      sx: {
                        position: "absolute",
                        bottom: ".8rem",
                        right: ".7rem",
                      },
                    }}
                  />
                </Box>
              );
            })}
          {media &&
            media?.video_url?.map((url, index) => {
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
                  <TimeMessage
                    time={message.ts}
                    isRead={isRead}
                    isCurrentUser={isCurrentUser}
                    timeMessageProps={{
                      sx: {
                        position: "absolute",
                        bottom: ".8rem",
                        right: ".7rem",
                      },
                    }}
                  />
                </Box>
              );
            })}
          {files?.length > 0 && (
            <Box
              display="flex"
              flexDirection="column"
              gap="0.5rem"
              alignItems="flex-end"
            >
              {files.map((file, index) => {
                const Icon = styleForFile(file?.title || "");
                return (
                  <Box
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    key={index}
                    sx={{
                      backgroundColor: "#EBF5FF",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <SvgIcon
                        component={Icon}
                        sx={{
                          fontSize: "35px",
                        }}
                      />
                      <Link
                        href={file?.title_link || ""}
                        target="_blank"
                        sx={{
                          color: "#3699FF",
                          overflowWrap: "anywhere",
                          fontWeight: 600,
                          textDecoration: "auto",
                        }}
                      >
                        {file?.title}
                      </Link>
                    </Box>
                    <TimeMessage
                      time={message.ts}
                      isRead={isRead}
                      isCurrentUser={isCurrentUser}
                    />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      }

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

export default AttachmentContent;
