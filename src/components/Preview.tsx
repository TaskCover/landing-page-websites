import React, { memo } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  backdropClasses,
  dialogClasses,
} from "@mui/material";
import { Text } from "./shared";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const IMAGES_EXTENSION = ["png", "jpeg", "jpg", "ico", "gif"];
const VIDEOS_EXTENSION = ["mp4", "mov", "wmv", "flv", "avi", "webm", "mkv"];
interface Attachment {
  link: string;
  name: string;
  object: string;
}

type PreviewProps = {
  type: string;
  src: string;
  listData?: Attachment[];
  listAttachmentsDown?: Attachment[];
} & Omit<DialogProps, "children">;

const Preview = (props: PreviewProps) => {
  const { type, src, listData, listAttachmentsDown, ...rest } = props;
  const indexSlide = listAttachmentsDown?.findIndex((el) => el.link == src);
  const commonT = useTranslations(NS_COMMON);

  const onClose = () => {
    props?.onClose && props.onClose({}, "escapeKeyDown");
  };

  const getExtension = (name: String) => {
    if (!name) return;
    const arr = name.split(".");
    const extension = arr[arr.length - 1];
    if (IMAGES_EXTENSION.includes(extension)) return `image/${extension}`;
    if (VIDEOS_EXTENSION.includes(extension)) return `video/${extension}`;
  };

  return (
    <Dialog
      sx={{
        [`& .${backdropClasses.root}`]: {},
        [`& .${dialogClasses.paper}`]: {
          backgroundColor: "rgba(153, 153, 153, 0.90)",
          width: "100vw",
          m: 0,
          height: "100%",
          maxWidth: "100vw",
          maxHeight: "calc(var(--vh, 1vh) * 100)",
        },
      }}
      {...rest}
    >
      <DialogTitle
        id="scroll-dialog-title"
        component="div"
        position="relative"
        sx={{
          backgroundColor: "#666666",
          height: 72,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          variant="h6"
          onClick={onClose}
          color="common.white"
          sx={{ cursor: "pointer" }}
        >
          {commonT("close")}
        </Text>
      </DialogTitle>
      <Box
        className="slide-container slider-comment-attachment"
        sx={{
          "& .react-slideshow-container .react-slideshow-wrapper .images-wrap":
            {
              "& div": {
                height: "calc(100vh - 72px)",
              },
            },
        }}
      >
        <Slide
          defaultIndex={indexSlide}
          infinite={false}
          autoplay={false}
          duration={5000}
          transitionDuration={500}
          easing="ease"
        >
          {listAttachmentsDown?.map((data, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getExtension(data?.name)?.startsWith("video") ? (
                <Box component="video" height="100%" width="100%" controls>
                  <source src={data.link} />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={data.link}
                  height="auto"
                  width="auto"
                  alt="Image"
                  sx={{
                    maxWidth: "600px",
                  }}
                />
              )}
            </div>
          ))}
        </Slide>
      </Box>
    </Dialog>
  );
};

export default memo(Preview);
