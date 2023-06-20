import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Input, InputProps } from "components/shared";
import SearchIcon from "icons/SearchIcon";
import useEventListener from "hooks/useEventListener";

type SearchProps = Omit<InputProps, "name" | "onChange"> & {
  name: string;
  onChange?: (name: string, value?: string) => void;
  emitWhenEnter?: boolean;
};

const Search = (props: SearchProps) => {
  const { onChange, name, sx, value = "", emitWhenEnter, ...rest } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const prevTextRef = useRef<string | number>(value);

  const [text, setText] = useState<string | number>(value);

  const onEnterClicked = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter" || !emitWhenEnter) return;
      const searchValue = typeof text === "number" ? text.toString() : text;
      prevTextRef.current = searchValue;
      onChange && onChange(name, searchValue);
    },
    [name, onChange, text, emitWhenEnter],
  );

  useEventListener("keydown", onEnterClicked, inputRef?.current);

  const onChangeValue = (newValue?: string | number) => {
    setText(newValue ?? "");
    if (!emitWhenEnter) {
      onChange && onChange(name, `${newValue ?? ""}`);
    }
  };

  const onBlur = () => {
    if (prevTextRef.current != text && emitWhenEnter) {
      setText(prevTextRef.current);
    }
  };

  useEffect(() => {
    setText(value ?? "");
    if (!emitWhenEnter) return;
    prevTextRef.current = value ?? "";
  }, [value, emitWhenEnter]);

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
      placeholder="Search..."
      onChangeValue={onChangeValue}
      value={text}
      {...rest}
    />
  );
};

export default memo(Search);
