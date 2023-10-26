/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

import styles from "./dBlockNodeView.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";
import { useAppSelector } from "store/hooks";
import PlusIcon from "icons/PlusIcon";
import DragIcon from "components/sn-docs/news/asset/icons/DragIcon";
import { Box } from "@mui/material";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const { theme } = useContext(ThemeContext);
  const pageInfo = useAppSelector((state) => state.doc.pageInfo);
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

  const fullWidth = pageInfo?.pageSettings?.fullWidth!;

  return (
    <>
      <NodeViewWrapper
        as="div"
        className={`${styles.dblock} ${styles[theme]} ${
          fullWidth ? styles.full_width : ""
        }`}
      >
        <section className={`${styles.wrapper_section}`} aria-label="left-menu">
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
          <div className={`${styles.icon}`} draggable data-drag-handle>
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
