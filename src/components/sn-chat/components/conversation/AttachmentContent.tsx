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
import { MediaPreviewItem, MessageInfo } from "store/chat/type";
import { TimeMessage } from "../messages/MessageContent";
import useTheme from "hooks/useTheme";

const IconFile = {
  [FILE_MAP.DOC]: FileDocIcon,
  [FILE_MAP.EXCEL]: FileExcelIcon,
  [FILE_MAP.PDF]: FilePdfIcon,
  [FILE_MAP.CSV]: FileCsvIcon,
};

const AttachmentContent = ({
  message,
  mediaListPreview,
  isCurrentUser,
  isRead,
  attachmentProps,
}: {
  message: MessageInfo;
  mediaListPreview: MediaPreviewItem[];
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

  const {isDarkMode} = useTheme();

  const renderBackgroundColor = useMemo(() => {
    if(isCurrentUser) {
      if(isDarkMode) return '#333333';
      return "#EBF5FF"
    }
    return isDarkMode ? "#3a3b3c" : "#F7F7FD";
  }, [isCurrentUser, isDarkMode]);


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
                <Box position="relative" key={index} height={112}>
                  <Avatar
                    size={112}
                    src={image || undefined}
                    style={{
                      borderRadius: "8px",
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
                        bottom: ".4rem",
                        right: ".3rem",
                        gap: "0.2rem",
                        padding: "0 6px",
                        borderRadius: "15px",
                        backgroundColor: "#00000080",
                      },
                    }}
                  />
                </Box>
              );
            })}
          {media &&
            media?.video_url?.map((url, index) => {
              return (
                <Box position="relative" key={index} height={112}>
                  <>
                    <PlayIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                        color: "common.white",
                        fontSize: 24,
                        zIndex: 1,

                        backgroundColor: "#FFFFFF4D",
                        borderRadius: "50px",
                        width: "30px",
                        height: "30px",
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
                    <Box
                      component="video"
                      ref={ref}
                      width={112}
                      height={112}
                      sx={{ objectFit: "cover", borderRadius: "8px" }}
                    >
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
                        bottom: ".4rem",
                        right: ".3rem",
                        gap: "0.2rem",
                        padding: "0 6px",
                        borderRadius: "15px",
                        backgroundColor: "#00000080",
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
              alignItems={isCurrentUser ? "flex-end" : "flex-start"}
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
                      backgroundColor: renderBackgroundColor,
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                    }}
                  >
                    <Box display="flex" alignItems="center">
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
                          color: isCurrentUser ? "#3699FF" : "black",
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
          listAttachmentsDown={mediaListPreview}
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
