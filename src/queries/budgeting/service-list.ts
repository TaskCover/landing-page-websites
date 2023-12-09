import { useQuery } from "react-query";
import { saleClientInstance } from "../../api/client";
import { getPath } from "utils/index";
import { Endpoint } from "../../api";

export const BUDGET_GET_SERVICE_QK: string = "budget_get_service_query_key";

export const budgetGetServiceQuery = (id: string): Promise<any> => {
  const url: string = getPath(Endpoint.BUDGET_SERVICE_LIST, undefined, { id: id });
  return saleClientInstance.get(url);
};

export const useBudgetGetServiceQuery = (id: string): any | undefined => {
  const { data } = useQuery({
    queryKey: [BUDGET_GET_SERVICE_QK, id],
    queryFn: () => budgetGetServiceQuery(id),
    retry: 0,
    staleTime: Infinity,
  });
  return data;
};
