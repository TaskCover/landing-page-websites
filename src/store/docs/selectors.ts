import { shallowEqual } from "react-redux";
import { DataStatus } from "constant/enums";
import { BaseQueries, Option } from "constant/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMemo, useCallback } from "react";
import { GetEmployeeListQueries, getEmployeeOptions, getEmployees } from "store/company/actions";


const useDocs = () => {
    const dispatch = useAppDispatch();
    const {
        docs: items,
        docsStatus: status,
        docsError: error,
        docsFilters: filters,
      } = useAppSelector((state) => state.doc, shallowEqual);
    const {pageIndex ,pageSize ,totalItems ,totalPages} = useAppSelector(state => state.doc.docsPaging)

    const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
    const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
    
    const onGetDocs = useCallback(
        async (queries: GetEmployeeListQueries) => {
            await dispatch(getEmployees(queries));
          },
          [dispatch],
    )

    // onGetDocDetail
    // onUpdateEmployee

    return {
        items,
        status,
        error,
        filters,
        isIdle,
        isFetching,
        pageIndex,
        pageSize,
        totalItems,
        totalPages,
        onGetDocs
    }
}

const useDocsOptions = () => {
    const dispatch = useAppDispatch();
  
    const {
      docOptions: items,
      docOptionsStatus: status,
      docOptionsError: error,
      docOptionsFilters: filters = {},
    } = useAppSelector((state) => state.doc, shallowEqual);
    const { pageIndex, pageSize, totalItems, totalPages } = useAppSelector(
      (state) => state.doc.docOptionsPaging,
      shallowEqual,
    );
  
    const options: Option[] = useMemo(
      () =>
        items.map((item) => ({
          label: item.fullname,
          value: item.id,
          avatar: item?.avatar?.link,
          subText: item.email,
        })),
      [items],
    );
  
    const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
    const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);

    const onGetOptions = useCallback(
      (queries: GetEmployeeListQueries) => {
        dispatch(getEmployeeOptions(queries));
      },
      [dispatch],
    );
  
    return {
      items,
      options,
      status,
      error,
      isIdle,
      isFetching,
      pageIndex,
      pageSize,
      totalItems,
      totalPages,
      filters,
      onGetOptions,
    };
  };


export {useDocs , useDocsOptions}