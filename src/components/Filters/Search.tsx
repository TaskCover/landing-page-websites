import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Input, InputProps } from "components/shared";
import SearchIcon from "icons/SearchIcon";
import useEventListener from "hooks/useEventListener";

type SearchProps = Omit<InputProps, "name" | "onChange"> & {
  name: string;
  onChange?: (name: string, value?: string) => void;
};

const Search = (props: SearchProps) => {
  const { onChange, name, sx, value = "", ...rest } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevTextRef = useRef<string | number>(value);

  const [text, setText] = useState<string | number>(value);

  const onEnterClicked = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      const searchValue = typeof text === "number" ? text.toString() : text;
      prevTextRef.current = searchValue;
      onChange && onChange(name, searchValue);
    },
    [name, onChange, text],
  );

  useEventListener("keydown", onEnterClicked, inputRef?.current);

  const onChangeValue = (newValue?: string | number) => {
    setText(newValue ?? "");
  };

  const onBlur = () => {
    if (prevTextRef.current != text) {
      setText(prevTextRef.current);
    }
  };

  useEffect(() => {
    setText(value ?? "");
    prevTextRef.current = value ?? "";
  }, [value]);

  return (
    <Input
      size="small"
      name={name}
      rootSx={{ height: 32, borderRadius: 1 }}
      sx={{
        height: 32,
        ...sx,
      }}
      InputProps={{
        onBlur,
      }}
      startNode={<SearchIcon />}
      placeholder="Tìm kiếm"
      onChangeValue={onChangeValue}
      value={text}
      {...rest}
    />
  );
};

export default memo(Search);
