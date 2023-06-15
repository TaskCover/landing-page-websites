import { memo } from "react";
import { Input, InputProps } from "components/shared";
import SearchIcon from "icons/SearchIcon";

type SearchProps = Omit<InputProps, "name" | "onChange"> & {
  name: string;
  onChange?: (name: string, value?: string) => void;
};

const Search = (props: SearchProps) => {
  const { onChange, name, ...rest } = props;

  const onChangeValue = (newValue?: string | number) => {
    onChange && onChange(name, `${newValue ?? ""}`);
  };

  return (
    <Input
      size="small"
      name={name}
      rootSx={{ height: 32, borderRadius: 1 }}
      startNode={<SearchIcon />}
      placeholder="Tìm kiếm"
      onChangeValue={onChangeValue}
      {...rest}
    />
  );
};

export default memo(Search);
