import { memo, useMemo } from "react";
import { AlertColor, TableCellProps } from "@mui/material";
import { BodyCell } from "components/Table";
import { Text } from "components/shared";

type StatusCellProps = {
  text: string;
  color: AlertColor;
} & TableCellProps;

const StatusCell = (props: StatusCellProps) => {
  const { text, color, ...rest } = props;

  return (
    <BodyCell {...rest}>
      <Text
        color={({ palette }) => palette[color].main}
        bgcolor={({ palette }) => palette[color].light}
        variant="caption"
        fontWeight={600}
        py={0.5}
        px={2}
        borderRadius={1.5}
      >
        {text}
      </Text>
    </BodyCell>
  );
};

export default memo(StatusCell);
