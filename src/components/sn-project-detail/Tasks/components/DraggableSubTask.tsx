import { Box, Stack } from "@mui/material";
import { Checkbox, IconButton } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useToggle from "hooks/useToggle";
import CaretIcon from "icons/CaretIcon";
import MoveListIcon from "icons/MoveListIcon";
// import MoveDotIcon from "icons/MoveDotIcon";
import MoveTagIcon from "icons/MoveTagIcon";
import { Dispatch, memo, SetStateAction, useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { checkIsMobile } from "utils/index";

type DraggableSubTaskProps = {
  id: string;
  index: number;
  orderTask: number;
  checked: boolean;
  lastEl: boolean;
  onChange: () => void;
  children: React.ReactNode;
  isHide: boolean;
  isHovered: boolean;
  setHideIds: Dispatch<SetStateAction<string[]>>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const DraggableSubTask = (props: DraggableSubTaskProps) => {
  const {
    id,
    index,
    checked,
    onChange,
    children,
    isHide,
    isHovered,
    setHideIds,
    orderTask,
    lastEl,
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
            sx={
              {
                //   "&::after": {
                //     position: "absolute",
                //     top: "38px",
                //     "border-bottom": "1px solid #1BC5BD",
                //     content: "''",
                //     width: "100%",
                //     height: "1px",
                //   },
              }
            }
            {...rest}
          >
            <Stack
              direction="row"
              alignItems="center"
              height={38}
              ml={5}
              gap={2}
              spacing={{ xs: 0.5, sm: 1 }}
              // borderBottom={{ md: "1px solid" }}
              // borderColor={{ md: "grey.100" }}
              sx={{
                "border-bottom": "1px solid #1BC5BD",
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
                  left: "12px",
                  // top: orderTask * 38,
                  top: `${
                    orderTask !== 0 ? `${orderTask * 38 - 19}px` : "0px"
                  }`,
                  "border-left": "1px solid #1BC5BD",
                  "border-bottom": "1px solid #1BC5BD",
                  content: "''",
                  width: "21px",
                  height: `${orderTask !== 0 ? "38px" : "19px"}`,
                  zIndex: 5,
                },
                "&::after": {
                  position: "absolute",
                  left: "29px",
                  top: orderTask * 38 + 16,
                  "border-top": "1px solid #1BC5BD",
                  "border-right": "1px solid #1BC5BD",
                  content: "''",
                  width: "5px",
                  height: "5px",
                  rotate: "45deg",
                  zIndex: 5,
                },
              }}
            >
              <Checkbox
                size="small"
                className="checkbox"
                checked={checked}
                onChange={onChange}
              />
              <IconButton
                className="checkbox"
                noPadding
                sx={{ zIndex: 10, paddingTop: "8px" }}
                {...provided.dragHandleProps}
              >
                <MoveListIcon
                  fontSize={isXlSmaller ? "small" : "medium"}
                  sx={{ color: "grey.A200" }}
                />
              </IconButton>
              {/* <IconButton
                noPadding
                sx={{
                  transform: isHide ? "rotate(180deg)" : undefined,
                }}
                onClick={onToggle}
              >
                <CaretIcon sx={{ color: "grey.300" }} />
              </IconButton> */}
            </Stack>

            {children}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableSubTask);
