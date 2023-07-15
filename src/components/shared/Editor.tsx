import { memo, useRef } from "react";
import { Stack } from "@mui/material";
import AppEditor, { EditorProps as AppEditorProps } from "components/Editor";
import Text from "./Text";
import hljs from "highlight.js";

type EditorProps = {
  title: string;
  name: string;
  required?: boolean;
  onChange: (name: string, value?: string) => void;
} & Omit<AppEditorProps, "onChange">;

const Editor = (props: EditorProps) => {
  const { title, name, required, onChange, ...rest } = props;

  const prevRef = useRef<string | undefined>();

  const onChangeEditor = (value?: string) => {
    const isEmpty = "<p><br></p>" === value;
    const newValue = isEmpty ? "" : getChild(value) ?? "";
    onChange(name, value);
  };

  return (
    <Stack
      spacing={1}
      flex={1}
      bgcolor="grey.50"
      px={2.5}
      pt={0.75}
      pb={1}
      borderRadius={1}
    >
      <Text variant="caption" color="grey.300">
        {title}
        {required ? "*" : ""}
      </Text>
      <AppEditor placeholder="" noCss onChange={onChangeEditor} {...rest} />
    </Stack>
  );
};

export default memo(Editor);

const getChild = (value?: string) => {
  if (value?.startsWith("<pre") && !value?.includes('"hljs-')) {
    return value + "<span></span>";
  }
  return value;
};
