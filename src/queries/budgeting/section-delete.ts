import { Endpoint } from "api";
import { saleClientInstance } from "../../api/client";
import { useMutation } from "react-query";
import { getPath } from "utils/index";

export const budgetServiceDelete = (sectionId: string) => {
  const url: string = getPath(Endpoint.BUDGET_SECTION_DELETE, undefined, {
    id: sectionId,
  });
  return saleClientInstance.delete(url);
}

export const useBudgetServiceDelete = () => {
  return useMutation({
    mutationFn: budgetServiceDelete
  });
}
