"use client";
import { Box, Popover } from "@mui/material";
import { DescriptionTask } from "components/sn-project-detail/Tasks/Detail/components";
import CloseIcon from "icons/CloseIcon";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type Description = PropsWithChildren<{
  taskId?: string;
  taskListId?: string;
  subTaskId?: string;
}>;

const Description = (props: Description) => {
  const { children = "--", taskId, taskListId, subTaskId } = props;
  const ref = useRef<HTMLElement | null>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLParagraphElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setIsOverflow((ref.current?.scrollHeight ?? 0) > 38);
  }, []);

  return (
    <>
      <Box
        component="p"
        ref={ref}
        sx={{
          fontSize: 14,
          px: 2,
          m: 0,
          py: "3px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          whiteSpace: "nowrap",
          height: 30,
          cursor: "pointer",
          "& > p": {
            m: 0,
          },
          "& *": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          },
        }}
        className="html"
        onClick={handleClick}
        dangerouslySetInnerHTML={{
          __html: (children as string) || "--",
        }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          ".MuiPaper-root": {
            border: "1px solid  #ECECF3",
            borderRadius: "8px",
            boxShadow: "0px 4px 20px 0px rgba(33, 33, 33, 0.04)",
          },
        }}
      >
        <Box
          padding="44px 24px 24px"
          position="relative"
          width="100%"
          maxWidth="343px"
        >
          <Box
            position="absolute"
            top="12px"
            right="24px"
            sx={{ cursor: "pointer" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Box>
          <DescriptionTask
            onClose={handleClose}
            open={true}
            {...{ taskId, taskListId, subTaskId }}
            textEdit={children == "--" ? "" : (children as string)}
          />
        </Box>
      </Popover>
    </>
  );
};

export default Description;
