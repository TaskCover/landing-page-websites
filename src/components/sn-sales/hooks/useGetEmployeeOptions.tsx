import { useEffect } from "react";
import { useEmployeeOptions } from "store/company/selectors";
import { useCompanyOptions } from "store/manager/selectors";

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

  useEffect(() => {
    onGetOptions({ pageIndex: 1, pageSize: 20 });
  }, [onGetOptions]);
    
  return {
    employeeOptions: options,
    employeeIsFetching: isFetching,
    onEndReachedEmployeeOptions,
  };
};

export default useGetEmployeeOptions;
