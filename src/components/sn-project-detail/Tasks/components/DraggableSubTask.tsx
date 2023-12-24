import { Box, Stack } from "@mui/material";
import { Checkbox, IconButton } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useToggle from "hooks/useToggle";
import CaretIcon from "icons/CaretIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import MoveDotIcon from "icons/MoveDotIcon";
import MoveListIcon from "icons/MoveListIcon";
// import MoveDotIcon from "icons/MoveDotIcon";
import MoveTagIcon from "icons/MoveTagIcon";
import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { checkIsMobile } from "utils/index";

type DraggableTaskProps = {
  id: string;
  index: number;
  checked: boolean;
  isSubTask: boolean;
  onChange: () => void;
  children: React.ReactNode;
  isHide: boolean;
  isHovered: boolean;
  setHideIds: Dispatch<SetStateAction<string[]>>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const DraggableTask = (props: DraggableTaskProps) => {
  const {
    id,
    index,
    checked,
    onChange,
    children,
    isHide,
    isHovered,
    isSubTask,
    setHideIds,
    ...rest
  } = props;

  const { isXlSmaller } = useBreakpoint();

  const isMobile = useMemo(() => checkIsMobile(), []);

  const onToggle = () => {
    setHideIds((prevIds) => {
      const newIds = [...prevIds];
      const indexSelected = newIds.findIndex((idValue) => idValue === id);
      if (indexSelected === -1) {
        newIds.push(id);
      } else {
        newIds.splice(indexSelected, 1);
      }
      return newIds;
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              overflow: "hidden",
              ...provided.draggableProps.style,
            }}
            className="draggable"
            {...rest}
          >
            <Stack
              key={subTask.id}
              direction="row"
              alignItems="center"
              minHeight={38}
              overflow="hidden"
              maxHeight={{ md: 38 }}
              sx={{
                "& >.checkbox": {
                  opacity: isMobile || checked || isHovered ? 1 : 0,
                  userSelect:
                    isMobile || checked || isHovered ? undefined : "none",
                },
                "&:hover >.checkbox": {
                  opacity: 1,
                },
                "&::before": {
                  position: "absolute",
                  left: "42px",
                  top: `${i !== 0 ? `${i * 38 + 19}px` : "38px"}`,
                  "border-left": "1px solid #1BC5BD",
                  "border-bottom": "1px solid #1BC5BD",
                  content: "''",
                  width: "21px",
                  height: `${i !== 0 ? "38px" : "19px"}`,
                  zIndex: 10,
                },
                "&::after": {
                  position: "absolute",
                  left: "58px",
                  top: `${(i + 1) * 38 + 16}px`,
                  "border-top": "1px solid #1BC5BD",
                  "border-right": "1px solid #1BC5BD",
                  content: "''",
                  width: "5px",
                  height: "5px",
                  rotate: "45deg",
                  zIndex: 10,
                },
              }}
            >
              {/* De can chinh */}
              <Checkbox
                className="checkbox0"
                size="small"
                style={{
                  opacity: "0",
                }}
              />
              {/* De can chinh */}

              <Checkbox
                size="small"
                className="checkbox"
                checked={checked}
                onChange={onChange}
              />

              <Checkbox
                className="checkbox"
                size="small"
                checked={checked}
                onChange={onChange}
              />

              <IconButton
                noPadding
                sx={{ zIndex: 10 }}
                {...provided.dragHandleProps}
              >
                <MoveListIcon
                  fontSize={isXlSmaller ? "small" : "medium"}
                  sx={{ color: "grey.A200" }}
                />
              </IconButton>
            </Stack>

            {children}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableTask);
