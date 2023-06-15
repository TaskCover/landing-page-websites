import { ChangeEvent, memo } from "react";
import { Select, SelectProps } from "components/shared";

type DropdownProps = Omit<SelectProps, "name" | "onChange"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (name: string, value: any) => void;
};

const Dropdown = (props: DropdownProps) => {
  const { rootSx, name, onChange, value, ...rest } = props;

  const onChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <Select
      size="small"
      hasAll
      onlyContent
      rootSx={{
        color: value ? "primary.main" : "grey.400",
        fontWeight: 600,
        "& >svg": { fontSize: 20 },
        ...rootSx,
      }}
      name={name}
      onChange={onChangeSelect}
      value={value}
      {...rest}
    />
  );
};

export default memo(Dropdown);
