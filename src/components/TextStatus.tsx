import { memo } from "react";
import { AlertColor } from "@mui/material";
import { Text, TextProps } from "components/shared";

type TextStatusProps = {
  text: string;
  color: AlertColor;
  width?: number;
} & Omit<TextProps, "color">;

const TextStatus = (props: TextStatusProps) => {
  const { text, color, width, ...rest } = props;

  return (
    <Text
      color={({ palette }) => palette[color].main}
      bgcolor={({ palette }) => palette[color].light}
      variant="caption"
      fontWeight={600}
      py={0.5}
      px={2}
      borderRadius={1.5}
      textAlign="center"
      display="inline-block"
      minWidth={width}
      {...rest}
    >
      {text}
    </Text>
  );
};

export default memo(TextStatus);
