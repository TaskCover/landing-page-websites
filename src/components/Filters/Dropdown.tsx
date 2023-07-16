import { ChangeEvent, memo, useMemo } from "react";
import { Select, SelectProps } from "components/shared";

export type DropdownProps = Omit<SelectProps, "name" | "onChange"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (name: string, value: any) => void;
};

const Dropdown = (props: DropdownProps) => {
  const { rootSx, name, onChange, value, sx, options, ...rest } = props;

  const hasValue = useMemo(
    () => options.some((option) => option.value === value),
    [options, value],
  );

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
        color: hasValue ? "primary.main" : "grey.400",
        fontWeight: 600,
        height: 32,
        "& .text-option": {
          fontWeight: 600,
          color: "grey.400",
        },
        "& >svg": { fontSize: 20 },
        ...rootSx,
      }}
      name={name}
      onChange={onChangeSelect}
      value={value}
      showPlaceholder
      sx={{
        height: 32,
        fontWeight: 600,
        ...sx,
      }}
      options={options}
      {...rest}
    />
  );
};

export default memo(Dropdown);
