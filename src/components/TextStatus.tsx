import { memo } from "react";
import { AlertColor } from "@mui/material";
import { Text, TextProps } from "components/shared";
import { useTranslations } from "next-intl";
import { NS_COMMON } from "constant/index";

type TextStatusProps = {
  text: string;
  color: AlertColor;
  width?: number;
} & Omit<TextProps, "color">;

const TextStatus = (props: TextStatusProps) => {
  const { text, color, width, ...rest } = props;

  const t = useTranslations(NS_COMMON);

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
      {t(text)}
    </Text>
  );
};

export default memo(TextStatus);
