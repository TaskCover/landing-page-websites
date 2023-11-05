import { refactorRawItemListResponse } from './../../utils/index';
import { shallowEqual } from "react-redux";
import { DataStatus, HttpStatusCode } from "constant/enums";
import { BaseQueries, Option } from "constant/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useMemo, useCallback, useState } from "react";
import { GetEmployeeListQueries, getEmployeeOptions } from "store/company/actions";
import {  getDocs } from "./actions";
import { Endpoint, client } from "api";
import { AN_ERROR_TRY_AGAIN, DOCS_API_URL } from "constant/index";
import { useRouter } from "next-intl/client";
import { useDispatch } from 'react-redux';
import { changeDocInfo, changeId, getDocDetails } from './reducer';


const useDocs = () => {
  const [loading , setLoading ] = useState(false)
  const {push} = useRouter();
    const dispatch = useAppDispatch();
    const {
        docs: items,
        docsStatus: status,
        docsError: error,
        docsFilters: filters,
      } = useAppSelector((state) => state.doc, shallowEqual);
    const {pageIndex ,pageSize ,totalDocs ,totalPages} = useAppSelector(state => state.doc.docsPaging)

    const isIdle = useMemo(() => status === DataStatus.IDLE, [status]);
    const isFetching = useMemo(() => status === DataStatus.LOADING, [status]);
    
    const onGetDocs = useCallback(
        async (queries) => {
            await dispatch(getDocs(queries));
          },
          [dispatch],
    )

    const onCreateDoc = async () => {
      setLoading(true)
      try {
        const response = await client.post(
          Endpoint.DOCS,
          {
            name: "No Name",
            description: "",
            // "project_id":"78537730-5155-11ee-a41a-97ec118da8c5",
          },
          {
            baseURL: 'http://103.196.145.232:6813/api/v1',
          },
        );
  
        if (response?.status === HttpStatusCode.CREATED) {
          dispatch(changeDocInfo(response.data))
          push(`/documents/${response.data.id}`)
        }
        setLoading(false)
        throw AN_ERROR_TRY_AGAIN;
      } catch (error) {
        setLoading(false)
        throw error;
      }
      
    };
  
    const handleUpdateDoc = async (data, id) => {
      await client.put(Endpoint.DOCS + `/${id}` , data , {
        baseURL: 'http://103.196.145.232:6813/api/v1',
      })
    }

    const handleGetDocDetail = async (id) => {
      dispatch(changeId(id));
      const res = await client.get(Endpoint.DETAIL_DOCS + `${id}`, {} , {
        baseURL: 'http://103.196.145.232:6813/api/v1',
      })

      if(res.status === HttpStatusCode.OK) {
        dispatch(getDocDetails(res.data));
      }
    }

    return {
        items,
        status,
        error,
        filters,
        isIdle,
        isFetching,
        pageIndex,
        pageSize,
        totalItems : totalDocs,
        totalPages,
        onGetDocs,
        onCreateDoc,
        loading,
        handleUpdateDoc,
        handleGetDocDetail
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