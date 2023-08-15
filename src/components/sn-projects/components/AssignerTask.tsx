import { memo, useState, useEffect } from "react";

import { NS_COMMON } from "constant/index";
import { useTranslations } from "next-intl";
import { Dropdown, DropdownProps } from "components/Filters";
import { useMemberOptions } from "store/project/selectors";

type AssignerTaskProps = Omit<DropdownProps, "options" | "name" | "onChange"> & {
  onHandler: (newValue: string) => void
};

const AssignerTask = (props: AssignerTaskProps) => {
  const {
    options,
  } = useMemberOptions();
  const commonT = useTranslations(NS_COMMON);

  const [filteredOptions, setFilteredOptions] = useState(options);

  const { onHandler } = props;
  const handleAssigner = async (owner, newValue) => {
    onHandler(newValue)
  };

  const onChangeSearch = (name: string, newValue?: string | number) => {
    const searchTerm = newValue?.toString().toLowerCase();

    if (searchTerm) {
      const filtered = options.filter((option) =>
        option?.label.toLowerCase().includes(searchTerm) ||
        option?.subText?.toLowerCase()?.includes(searchTerm)
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  };

  useEffect(() => {
    return () => {
      setFilteredOptions(options);
    };
  }, [options]);

  return (
    <Dropdown
      hasAll={false}
      options={filteredOptions}
      hasAvatar
      name="owner.id"
      onChangeSearch={onChangeSearch}
      sx={{
        display: { xs: "none", md: "initial" },
        minWidth: "0 !important",
        overflowX: "unset !important",
        width: "100% !important"
      }}
      onChange={handleAssigner}
      placeholder={commonT("form.title.assigner")}
      {...props}
    />
  );
};

export default memo(AssignerTask);