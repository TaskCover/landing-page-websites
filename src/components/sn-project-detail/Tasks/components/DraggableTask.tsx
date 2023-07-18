import { Box, Stack } from "@mui/material";
import { Checkbox, IconButton } from "components/shared";
import useBreakpoint from "hooks/useBreakpoint";
import useToggle from "hooks/useToggle";
import CaretIcon from "icons/CaretIcon";
import MoveDotIcon from "icons/MoveDotIcon";
import { Dispatch, memo, SetStateAction } from "react";
import { Draggable } from "react-beautiful-dnd";

type DraggableTaskProps = {
  id: string;
  index: number;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  isHide: boolean;
  isHovered: boolean;
  setHideIds: Dispatch<SetStateAction<string[]>>;
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
    setHideIds,
    ...rest
  } = props;

  const { isXlSmaller } = useBreakpoint();

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
              direction="row"
              alignItems="center"
              height={38}
              ml={5}
              spacing={{ xs: 0.5, sm: 1 }}
              borderBottom={{ md: "1px solid" }}
              borderColor={{ md: "grey.100" }}
              sx={{
                "& >.checkbox": {
                  opacity: checked || isHovered ? 1 : 0,
                  userSelect: checked || isHovered ? undefined : "none",
                },
                "&:hover >.checkbox": {
                  opacity: 1,
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
                sx={{ zIndex: 10 }}
                {...provided.dragHandleProps}
              >
                <MoveDotIcon
                  fontSize={isXlSmaller ? "small" : "medium"}
                  sx={{ color: "grey.A200" }}
                />
              </IconButton>
              <IconButton
                noPadding
                sx={{
                  transform: isHide ? "rotate(180deg)" : undefined,
                }}
                onClick={onToggle}
              >
                <CaretIcon sx={{ color: "grey.300" }} />
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
