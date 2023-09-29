/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from "@mui/material";
import { Text } from "components/shared";
import CloseIcon from "icons/CloseIcon";
import Image from "next/image";
import React, { memo, useState } from "react";

interface IDrawComment {
  setOpenComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutSlider = ({
  children,
  heightToolbar,
  heightContent,
  height,
}: {
  children: React.ReactNode;
  heightToolbar: any;
  heightContent: any;
  height: any;
}) => {
  return (
    <Box
      sx={{
        borderLeft: "1px #ECECF3 solid",
        zIndex: "30",
        position: "absolute",
        right: {
          sm: 24,
          xs: -16,
        },
        top: {
          sm: heightToolbar + 30,
          xs: 0,
        },
        padding: "16px 12px",
        maxWidth: "280px",
        width: "100%",
        bgcolor: "white",
        height: {
          sm: heightContent + heightToolbar + 26,
          // xs: heightContent + height,
          xs: "100%",
        },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export const CommentDocsItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        gap: "5px",
      }}
    >
      <Box
        sx={{
          width: "28px",
          height: "28px",
          borderRadius: "100%",
          backgroundColor: "#ECECF3",
        }}
      >
        {/* <Image src={} alt=""></Image> */}
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            sx={{
              fontSize: "10px",
              fontWeight: "600",
            }}
          >
            Jenny Wilson
          </Text>
          <Text
            sx={{
              fontSize: "8px",
              fontWeight: "300",
            }}
          >
            06:42 am
          </Text>
        </Box>
        <Text
          sx={{
            fontSize: "10px",
            fontWeight: "400",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur ma
        </Text>
      </Box>
    </Box>
  );
};

const DrawComment = ({ setOpenComment }: IDrawComment) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
        }}
      >
        <Text>Comments (5)</Text>
        <Box
          onClick={() => setOpenComment(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <CloseIcon></CloseIcon>
        </Box>
      </Box>
      <Stack
        spacing={"16px"}
        sx={{
          marginTop: "16px",
        }}
      >
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
        <CommentDocsItem></CommentDocsItem>
      </Stack>
    </>
  );
};

export default DrawComment;
