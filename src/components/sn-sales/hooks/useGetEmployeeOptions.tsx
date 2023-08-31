import { useEffect } from "react";
import { useEmployeeOptions } from "store/company/selectors";

const useGetEmployeeOptions = () => {
  const {
    options,
    onGetOptions,
    isFetching,
    totalPages,
    pageIndex,
    pageSize,
    filters,
  } = useEmployeeOptions();

  const onEndReachedEmployeeOptions = () => {
    if (isFetching || (totalPages && pageIndex >= totalPages)) return;
    onGetOptions({ ...filters, pageSize, pageIndex: pageIndex + 1 });
  };

  const onSearchEmployee = (name: string, value = "") => {
    onGetOptions({
      pageIndex: 1,
      pageSize: 20,
      email: (value as string) || "",
    });
  };

  return {
    employeeOptions: options,
    employeeIsFetching: isFetching,
    onEndReachedEmployeeOptions,
    onGetEmployeeOptions: onGetOptions,
    onSearchEmployee,
  };
};

export const useFetchEmployeeOptions = () => {
  const { onGetOptions, pageIndex, pageSize, filters } = useEmployeeOptions();

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);
};
export default useGetEmployeeOptions;
