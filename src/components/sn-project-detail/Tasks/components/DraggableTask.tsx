import { Stack } from "@mui/material";
import { Checkbox, IconButton } from "components/shared";
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
    setHideIds,
    ...rest
  } = props;

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
          <div
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
              height={48}
              pl={{ xs: 1, md: 2 }}
              spacing={{ xs: 0.5, sm: 1 }}
            >
              <Checkbox checked={checked} onChange={onChange} />
              <IconButton noPadding {...provided.dragHandleProps}>
                <MoveDotIcon fontSize="medium" sx={{ color: "grey.A200" }} />
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
          </div>
        );
      }}
    </Draggable>
  );
};

export default memo(DraggableTask);
