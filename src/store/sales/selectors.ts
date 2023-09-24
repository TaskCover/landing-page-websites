import { on } from "events";
import { DataStatus, SORT_OPTIONS } from "constant/enums";
import { useCallback, useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  CommentData,
  DealData,
  GetSalesListQueries,
  SectionData,
  TodoData,
  TodoItemData,
  createComment,
  createDeal,
  createServiceSection,
  createTodo,
  deleteSection,
  deleteTodo,
  getDetailDeal,
  getSales,
  getServices,
  updateDeal,
  updatePriority,
  updateServiceSection,
  updateTodo,
} from "./actions";
import moment from "moment";
import { useSnackbar } from "store/app/selectors";
import { ServiceSection, Todo, setColumn } from "./reducer";
import Item from "components/sn-cost-history/Item";
import {
  ServiceColumn,
  defaultShowColumns,
  useGetHeaderColumn,
} from "components/sn-sales-detail/hooks/useGetHeaderColumn";

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
        tags: data.tags,
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
        tags: data.tags,
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
      const expiration_date =
        data.expiration_date &&
        moment(data.expiration_date, "DD-MM-YYYY").format("YYYY-MM-DD");
      return await dispatch(
        createTodo({
          todo_list: [
            {
              ...data,
              expiration_date: expiration_date,
            },
          ],
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
      const expiration_date =
        data.expiration_date &&
        moment(data.expiration_date, "DD-MM-YYYY").format("YYYY-MM-DD");

      return await dispatch(
        updateTodo({
          id,
          data: {
            todo_list: {
              ...data,
              owner: data.owner ?? "",
              expiration_date: expiration_date,
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

  const onUpdatePriority = async (
    id,
    { dealId, priority }: { dealId: string; priority: number },
  ) => {
    await updatePriority({
      id,
      data: {
        deal_id: dealId,
        todo_list: {
          priority,
        } as TodoItemData,
      },
    });
  };

  return {
    salesTodo,
    salesTodoStatus,
    salesTodoError,
    isIdle,
    isFetching,
    onCreateTodo,
    onUpdateTodo,
    onDeleteTodo,
    onUpdatePriority,
  };
};

export const useSalesComment = () => {
  const { saleDetail, commentsStatus, commentsError, sectionColumns } =
    useAppSelector((state) => state.sales, shallowEqual);
  const dispatch = useAppDispatch();

  const salesComment = useMemo(() => {
    if (saleDetail) {
      return saleDetail.comments;
    }
    return [];
  }, [saleDetail]);

  const isIdle = useMemo(
    () => commentsStatus === DataStatus.IDLE,
    [commentsStatus],
  );
  const isFetching = useMemo(
    () => commentsStatus === DataStatus.LOADING,
    [commentsStatus],
  );

  const onCreateComment = useCallback(
    async (data: CommentData) => {
      return await dispatch(createComment({ data })).unwrap();
    },
    [dispatch],
  );

  return {
    commentsError,
    salesComment,
    isIdle,
    isFetching,
    onCreateComment,
  };
};

export const useSalesService = () => {
  const { saleDetail } = useSaleDetail();
  const {
    serviceSectionList,
    serviceSection,
    servicesError,
    servicesStatus,
    sectionColumns,
  } = useAppSelector((state) => state.sales, shallowEqual);
  const dispatch = useAppDispatch();
  const isIdle = useMemo(
    () => servicesStatus === DataStatus.IDLE,
    [servicesStatus],
  );
  const isFetching = useMemo(
    () => servicesStatus === DataStatus.LOADING,
    [servicesStatus],
  );

  const isSuccessful = useMemo(
    () => servicesStatus === DataStatus.SUCCEEDED,
    [servicesStatus],
  );

  const onGetService = useCallback(
    async (dealId) => {
      await dispatch(getServices({ dealId }));
    },
    [dispatch],
  );

  const onUpdateSection = useCallback(
    async ({ sectionId, data }: { sectionId: string; data: SectionData }) => {
      await dispatch(updateServiceSection({ sectionId, data }));
    },
    [dispatch],
  );

  const onCreateSection = useCallback(
    async ({
      dealId,
      data,
      start_date,
    }: {
      dealId: string;
      start_date: string;
      data: SectionData[];
    }) => {
      const newData = data.map((item) => ({
        ...item,
        services: item.service,
      }));

      await dispatch(
        createServiceSection({
          dealId,
          data: newData as SectionData[],
          start_date,
        }),
      );
    },
    [dispatch],
  );

  const onSetColumns = (
    sectionIndex: number,
    col: ServiceColumn | ServiceColumn[],
  ) => {
    const columns = sectionColumns[sectionIndex]
      ? [...sectionColumns[sectionIndex].columns]
      : [...defaultShowColumns];

    if (col instanceof Array) {
      dispatch(setColumn({ sectionIndex, columns: col }));
      return;
    }
    const isExisted = columns.includes(col);
    if (isExisted) {
      columns.splice(columns.indexOf(col), 1);
    } else {
      columns.push(col);
    }

    dispatch(setColumn({ sectionIndex, columns }));
  };
  const onDeleteSection = useCallback(
    async (sectionId: string) => {
      await dispatch(deleteSection({ sectionId }));
    },
    [dispatch],
  );
  return {
    serviceSectionList,
    serviceSection,
    servicesError,
    isSuccessful,
    isIdle,
    isFetching,
    sectionColumns,
    onGetService,
    onCreateSection,
    onUpdateSection,
    onSetColumns,
    onDeleteSection,
  };
};
