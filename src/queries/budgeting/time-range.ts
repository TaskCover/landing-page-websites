import { useMutation, useQuery } from "react-query";
import { getPath } from "utils/index";
import { Endpoint } from "../../api";
import { saleClientInstance } from "../../api/client";

export const BUDGET_GET_TIME_RANGES_QK = "budget_get_time_ranges_query_key";

export type TBudgetTimeRange = any;
export type TBudgetTimeRanges = TBudgetTimeRange[];
export interface TBudgetTimeAdd {
  budget: string;
  services: string;
  note: string;
  timeRanges: number;
  billableTime: number;
}

export const budgetGetTimeRangeQuery = (id: string): Promise<any> => {
  const url: string = getPath(Endpoint.BUDGET_GET_TIME_RANGES, undefined, {
    id: id,
  });
  return saleClientInstance.get(url);
};

export const useBudgetGetTimeRangeQuery = (id: string): any | undefined => {
  const { data, refetch } = useQuery({
    queryKey: [BUDGET_GET_TIME_RANGES_QK, id],
    queryFn: () => budgetGetTimeRangeQuery(id),
    retry: 0,
    staleTime: 10000,
  });
  return {data, refetch};
};

export const budgetTimeRemove = (id: string) => {
  const url: string = getPath(Endpoint.BUDGET_DELETE_TIME_RANGES, undefined, {
    id: id,
  });
  return saleClientInstance.delete(url);
};

export const useBudgetTimeRemove = () => {
  return useMutation({
    mutationFn: budgetTimeRemove,
  });
};

export const budgetTimeAdd = (data:TBudgetTimeAdd) => {
  return saleClientInstance.post(Endpoint.BUDGET_TIME_RANGES,data);
};

export const useBudgetTimeAdd = () => {
  return useMutation({
    mutationFn: budgetTimeAdd,
  });
};
