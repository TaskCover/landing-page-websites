/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DragIcon from "components/sn-docs/news/asset/icons/DragIcon";
import PlusIcon from "icons/PlusIcon";
import styles from "./dBlockNodeView.module.scss";
import {
  JSONContent,
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  Content,
} from "@tiptap/react";
import { Text } from "components/shared";
import { ThemeContext } from "../../../context/ThemeContext";
import { useAppSelector } from "store/hooks";
import React, { useContext, useMemo, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  popoverClasses,
} from "@mui/material";
import DuplicateIcon from "icons/DuplicateIcon";
import CopyLinkBlock from "icons/CopyLinkBlock";
import TextColorIcon from "icons/TextColorIcon";
import BgIcon from "icons/BgIcon";
import DeleteUserIcon from "icons/DeleteUserIcon";
import DeleteDocs from "icons/DeleteDocs";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
  deleteNode,
}) => {
  const { theme } = useContext(ThemeContext);
  const pageInfo = useAppSelector((state) => state.doc.pageInfo);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const isTable = useMemo(() => {
    const { content } = node.content as any;

    return content[0].type.name === "table";
  }, [node.content]);

  const createNodeAfter = () => {
    const pos = getPos() + node.nodeSize;
    editor.commands.insertContentAt(pos, {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  const onDuplicate = () => {
    // editor.commands.insertContent();
  };

  const fullWidth = pageInfo?.pageSettings?.fullWidth!;

  return (
    <>
      <NodeViewWrapper
        as="div"
        className={`${styles.dblock} ${styles[theme]} ${
          fullWidth ? styles.full_width : ""
        }`}
      >
        <section
          className={`${styles.wrapper_section}`}
          style={{
            position: "relative",
          }}
          aria-label="left-menu"
        >
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            sx={{
              [`& .${popoverClasses.paper}`]: {
                backgroundImage: "none",
                minWidth: 190,
                maxWidth: 190,
              },
            }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: 1,
                },
              },
            }}
          >
            <Stack
              sx={{
                boxShadow: "2px 2px 24px rgba(0, 0, 0, 0.1)",
                border: "1px solid",
                borderTopWidth: 0,
                borderColor: "grey.100",
                borderRadius: 1,
              }}
            >
              <MenuList component={Box}>
                <MenuItem
                  onClick={onDuplicate}
                  component={ButtonBase}
                  sx={sxConfig.item}
                >
                  <DuplicateIcon fontSize="medium"></DuplicateIcon>
                  <Text variant="body2" color="grey.400">
                    Duplicate
                  </Text>
                </MenuItem>
                <MenuItem component={ButtonBase} sx={sxConfig.item}>
                  <CopyLinkBlock></CopyLinkBlock>
                  <Text variant="body2" color="grey.400">
                    Copy link to block
                  </Text>
                </MenuItem>
                <MenuItem component={ButtonBase} sx={sxConfig.item}>
                  <TextColorIcon></TextColorIcon>
                  <Text variant="body2" color="grey.400">
                    Text color
                  </Text>
                </MenuItem>
                <MenuItem component={ButtonBase} sx={sxConfig.item}>
                  <BgIcon></BgIcon>
                  <Text variant="body2" color="grey.400">
                    Background color
                  </Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deleteNode();
                  }}
                  component={ButtonBase}
                  sx={sxConfig.item}
                >
                  <DeleteDocs></DeleteDocs>
                  <Text variant="body2" color="error.main">
                    Delete
                  </Text>
                </MenuItem>
              </MenuList>
            </Stack>
          </Popover>
          <Box
            sx={{
              display: {
                sm: "flex !important",
                xs: "none !important",
              },
            }}
            className={`${styles.icon}`}
            onClick={createNodeAfter}
          >
            <PlusIcon />
          </Box>
          <div
            onClick={handleClick}
            className={`${styles.icon}`}
            draggable
            data-drag-handle
          >
            <DragIcon />
          </div>
        </section>

        <NodeViewContent
          className={`${styles.dblock_view} ${
            isTable ? styles.margin_left : ""
          }`}
        />
      </NodeViewWrapper>
    </>
  );
};

const sxConfig = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    py: 1,
    px: 2,
  },
};
