import { memo, useEffect } from "react";
import { Dropdown, DropdownProps } from "components/Filters";
import { NS_COMMON, NS_MANAGER } from "constant/index";
import { useTranslations } from "next-intl";
import { useEmployeeOptions } from "store/company/selectors";

const AssignerFilter = (
  props: Omit<DropdownProps, "options" | "name"> & { name?: string },
) => {
  const {
    options,
    onGetOptions,
    isFetching,
    totalPages,
    pageIndex,
    pageSize,
    filters,
  } = useEmployeeOptions();
  const commonT = useTranslations(NS_COMMON);

  const onEndReached = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const onChangeSearch = () => {
    //
  };

  return (
    <Dropdown
      placeholder={commonT("form.title.assigner")}
      options={options}
      name="owner"
      onEndReached={onEndReached}
      {...props}
    />
  );
};

export default memo(AssignerFilter);
