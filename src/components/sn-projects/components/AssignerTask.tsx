import { memo } from "react";

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

  const { onHandler } = props
  const handleAssigner = async (owner, newValue) => {
    onHandler(newValue)
  };

  return (
    <Dropdown
      hasAll={false}
      options={options}
      hasAvatar
      name="owner.id"
      sx={{
        display: { xs: "none", md: "initial" },
        minWidth: "0 !important",
        overflowX: "unset !important",
      }}
      onChange={handleAssigner}
      placeholder={commonT("form.title.assigner")}
      {...props}
    />
  );
};

export default memo(AssignerTask);