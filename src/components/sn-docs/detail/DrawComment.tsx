/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Stack } from "@mui/material";
import Avatar from "components/Avatar";
import { Text } from "components/shared";
import { NS_DOCS } from "constant/index";
import { formatDistance } from "date-fns";
import CloseIcon from "icons/CloseIcon";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import { NewPageContext } from "../news/context/NewPageContext";
import { TComment } from "../news/types/Page";
import useTheme from "hooks/useTheme";

export const LayoutSlider = ({
  children,
  heightToolbar,
  heightContent,
  height,
}: {
  children: React.ReactNode;
  heightToolbar?: any;
  heightContent?: any;
  height?: any;
}) => {
  return (
    <Box
      sx={{
        borderLeft: "1px #ECECF3 solid",
        zIndex: "30",
        position: "absolute",
        right: 0,
        top: 0,
        padding: "16px 12px",
        maxWidth: "280px",
        width: "100%",
        // bgcolor: "background.default",
        height: {
          sm: height,
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

export const CommentItem: React.FC<TComment> = (props) => {
  const { activeCommentId } = useContext(NewPageContext);
  const { isDarkMode } = useTheme();
  const isActiveComment = activeCommentId === props.id;
  const activeBgColor = isDarkMode ? "grey.50" : "primary.light";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        gap: "8px",
        padding: "4px",
        borderRadius: "4px",
        bgcolor: isActiveComment ? activeBgColor : "inherit",
        color: "ButtonText",
      }}
    >
      <Avatar src={props.user.avatar?.link} size={32} />

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
            {props.user.fullname}
          </Text>
          <Text
            sx={{
              fontSize: "10px",
              fontWeight: "300",
            }}
          >
            {formatDistance(props.createdAt, new Date(), { addSuffix: true })}
          </Text>
        </Box>
        <Text
          sx={{
            fontSize: "12px",
            fontWeight: "400",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {props.content}
        </Text>
      </Box>
    </Box>
  );
};

const DrawComment = () => {
  const docsT = useTranslations(NS_DOCS);
  const { openComment, setOpenComment, comments, activeCommentId } =
    useContext(NewPageContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
        }}
      >
        <Text>
          {docsT("createDoc.comment")} ({comments.length})
        </Text>
        <Box
          onClick={() => setOpenComment(!openComment)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </Box>
      </Box>
      <Stack
        spacing={"16px"}
        sx={{
          marginTop: "16px",
        }}
      >
        {comments.map((cmt: TComment) => (
          <CommentItem key={cmt.id} {...cmt} />
        ))}
      </Stack>
    </>
  );
};

export default DrawComment;
