import { memo } from "react";
import { AlertColor, TableCellProps } from "@mui/material";
import { BodyCell } from "components/Table";
import TextStatus from "components/TextStatus";

type StatusCellProps = {
  text: string;
  color: AlertColor;
  width?: number;
  namespace?: string;
} & TableCellProps;

const StatusCell = (props: StatusCellProps) => {
  const { text, color, width, namespace, ...rest } = props;

  return (
    <BodyCell {...rest}>
      <TextStatus
        text={text}
        color={color}
        width={width}
        namespace={namespace}
      />
    </BodyCell>
  );
};

export default memo(StatusCell);
