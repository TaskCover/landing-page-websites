import { DataStatus, SORT_OPTIONS } from "constant/enums";
import { useCallback, useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  DealData,
  GetSalesListQueries,
  TodoData,
  TodoItemData,
  createDeal,
  createTodo,
  deleteTodo,
  getDetailDeal,
  getSales,
  updateDeal,
  updateTodo,
} from "./actions";
import moment from "moment";
import { useSnackbar } from "store/app/selectors";

export const useSales = () => {
  const { onAddSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { sales, salesFilters, salesError, salesStatus } = useAppSelector(
    (state) => state.sales,
    shallowEqual,
  );
  const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
    (state) => state.sales.salesPaging,
    shallowEqual,
  );

  const isIdle = useMemo(() => salesStatus === DataStatus.IDLE, [salesStatus]);
  const isFetching = useMemo(
    () => salesStatus === DataStatus.LOADING,
    [salesStatus],
  );

  const totalRevenue = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.revenue, 0);
  }, [sales]);

  const totalRevenuePJ = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.revenuePJ, 0);
  }, [sales]);

  const totalTime = useMemo(() => {
    return sales.reduce((prev, data) => prev + data.estimate, 0);
  }, [sales]);

  const onGetSales = useCallback(
    async (queries: GetSalesListQueries) => {
      await dispatch(getSales(queries));
    },
    [dispatch],
  );

  const onCreateDeal = useCallback(
    async (data) => {
      const members = data.members.map((value) => ({ id: value }));
      const description = data.tags.join(",");
      const convertedBody: DealData = {
        currency: data.currency,
        owner: data.owner,
        description: description,
        name: data.dealName,
        members,
        company_id: data.company,
      };

      await dispatch(createDeal(convertedBody)).then(() => {
        let newPageIndex = totalPages || 0;
        if (totalPages && totalItems) {
          newPageIndex =
            totalItems % pageSize === 0 ? totalPages + 1 : totalPages;
        }
        onGetSales({
          ...salesFilters,
          pageIndex: 1,
          pageSize: 10,
          sort: SORT_OPTIONS.DESC,
        });
      });
    },
    [dispatch],
  );
  const onUpdateDeal = useCallback(
    async (data) => {
      const start_date =
        (data.start_date &&
          moment(data.start_date, "DD-MM-YYYY").format("YYYY-MM-DD")) ||
        undefined;
      const description = data.tags?.join(",");
      const convertedBody: DealData = {
        currency: data.currency,
        owner: data.owner,
        description: description,
        name: data.dealName,
        probability: data.probability,
        members: data.members,
        status: data.status,
        company_id: data.company,
        start_date,
      };
      await dispatch(updateDeal({ id: data.id, data: convertedBody }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (salesError) {
      onAddSnackbar(salesError, "error");
    }
  }, [salesError]);

  return {
    sales,
    salesFilters,
    salesError,
    totalRevenue,
    totalRevenuePJ,
    totalTime,
    salesStatus,
    pageIndex,
    pageSize,
    totalItems,
    totalPages,
    isIdle,
    isFetching,
    onGetSales,
    onUpdateDeal,
    onCreateDeal,
  };
};

export const useSaleDetail = () => {
  const dispatch = useAppDispatch();
  const { saleDetail, saleDetailError, saleDetailStatus } = useAppSelector(
    (state) => state.sales,
    shallowEqual,
  );
  const isIdle = useMemo(
    () => saleDetailStatus === DataStatus.IDLE,
    [saleDetailStatus],
  );
  const isFetching = useMemo(
    () => saleDetailStatus === DataStatus.LOADING,
    [saleDetailStatus],
  );

  const onGetSaleDetail = useCallback(
    async (id: string) => {
      await dispatch(getDetailDeal(id));
    },
    [dispatch],
  );

  return {
    saleDetail,
    saleDetailError,
    saleDetailStatus,
    isIdle,
    isFetching,
    onGetSaleDetail,
  };
};

export const useSalesTodo = () => {
  const { saleDetail, salesTodoStatus, salesTodoError } = useAppSelector(
    (state) => state.sales,
    shallowEqual,
  );
  const dispatch = useAppDispatch();
  const salesTodo = useMemo(() => {
    if (saleDetail) {
      return saleDetail.todo_list;
    }
    return [];
  }, [saleDetail]);

  const isIdle = useMemo(
    () => salesTodoStatus === DataStatus.IDLE,
    [salesTodoStatus],
  );
  const isFetching = useMemo(
    () => salesTodoStatus === DataStatus.LOADING,
    [salesTodoStatus],
  );

  const onCreateTodo = useCallback(
    async ({ dealId, data }: { dealId: string; data: TodoItemData }) => {
      return await dispatch(
        createTodo({
          todo_list: {
            ...data,
            due_date: moment(data.due_date, "DD-MM-YYYY").format("YYYY-MM-DD"),
          },
          deal_id: dealId,
        }),
      ).unwrap();
    },
    [dispatch],
  );

  const onUpdateTodo = useCallback(
    async (
      id: string,
      { dealId, data }: { dealId: string; data: TodoItemData },
    ) => {
      const due_date =
        (data.due_date &&
          moment(data.due_date, "DD-MM-YYYY").format("YYYY-MM-DD")) ||
        undefined;
      return await dispatch(
        updateTodo({
          id,
          data: {
            todo_list: {
              ...data,
              due_date,
            },
            deal_id: dealId,
          },
        }),
      ).unwrap();
    },
    [dispatch],
  );
  const onDeleteTodo = useCallback(
    async (id: string, dealId: string) => {
      return await dispatch(
        deleteTodo({
          id,
          dealId,
        }),
      ).unwrap();
    },
    [dispatch],
  );
  return {
    salesTodo,
    salesTodoStatus,
    salesTodoError,
    isIdle,
    isFetching,
    onCreateTodo,
    onUpdateTodo,
    onDeleteTodo,
  };
};
