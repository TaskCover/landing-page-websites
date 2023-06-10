import { useEffect, useState } from "react";
import { Props } from ".";
import queryString from "query-string";

export const useProject = (props: Props) => {
  const pageSizeOptions = [
    {
      label: "5",
      value: "5",
    },
    {
      label: "10",
      value: "10",
    },
    {
      label: "20",
      value: "20",
    },
    {
      label: "50",
      value: "50",
    },
  ];

  const getPageSize = (propValue?: number) => {
    if (
      !propValue ||
      pageSizeOptions.filter((r) => Number(r.value) === propValue).length <= 0
    ) {
      return 10;
    } else return propValue;
  };

  const [filterState, setFilterState] = useState<Required<Props>>({
    page: props.page || 1,
    pageSize: getPageSize(props.pageSize),
  });

  useEffect(() => {
    console.log(queryString.stringify(filterState));
  }, [filterState]);

  return [{ filterState, pageSizeOptions }, { setFilterState }] as const;
};
