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

type PreviewProps = {
  type: string;
  src: string;
} & Omit<DialogProps, "children">;

const Preview = (props: PreviewProps) => {
  const { type, src, ...rest } = props;
  const commonT = useTranslations(NS_COMMON);

  const onClose = () => {
    props?.onClose && props.onClose({}, "escapeKeyDown");
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
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
        }}
      >
        {type.startsWith("video") ? (
          <Box component="video" height="100%" width="auto" controls>
            <source src={src} />
          </Box>
        ) : (
          <Box
            component="img"
            src={src}
            height="100%"
            width="auto"
            alt="Image"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(Preview);
